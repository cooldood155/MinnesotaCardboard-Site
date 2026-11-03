// GitHub sign-in for the editor at mncardboard.com/admin/ (Decap CMS).
//  - /auth
//     sends author to GitHub to sign in
//  - /callback
//     where GitHub sends authors back; hands token to editor
//
// Settings: GITHUB_CLIENT_ID and ALLOWED_ORIGINS in wrangler.jsonc, and
// GITHUB_CLIENT_SECRET via `npx wrangler secret put GITHUB_CLIENT_SECRET`.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return startSignIn(url, env);
    if (url.pathname === "/callback") return finishSignIn(request, url, env);
    return new Response("Not found", { status: 404 });
  },
};

function startSignIn(url, env) {
  const state = crypto.randomUUID();
  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  githubUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
  githubUrl.searchParams.set("scope", "repo"); // lets the editor commit posts
  githubUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: githubUrl.toString(),
      // only browser that started the sign-in can finish it; /callback uses
      "Set-Cookie": `state=${state}; Path=/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}

async function finishSignIn(request, url, env) {
  const cookies = request.headers.get("Cookie") ?? "";
  const savedState = cookies.match(/(?:^|;\s*)state=([^;]+)/)?.[1];
  const code = url.searchParams.get("code");

  if (!code || !savedState || url.searchParams.get("state") !== savedState) {
    return sendResult(env, "error", { message: "The sign-in expired. Try again." });
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "mncardboard-cms-auth",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });
  const data = await response.json();

  if (!data.access_token) {
    return sendResult(env, "error", {
      message: data.error_description ?? "GitHub didn't send back a token.",
    });
  }
  return sendResult(env, "success", { token: data.access_token, provider: "github" });
}

/** This page opens in a popup from the editor. It informs the editor it's
ready, then sends the result only to a site in ALLOWED_ORIGINS. */
function sendResult(env, status, content) {
  const origins = env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  // "</script>" in a message will not end script early
  const toScript = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<meta charset="utf-8">
<title>Signing in</title>
<p>Signing in... You can close this window if it stays open.</p>
<script>
  const origins = ${toScript(origins)};
  const message = ${toScript(message)};
  window.addEventListener("message", (event) => {
    if (origins.includes(event.origin)) window.opener.postMessage(message, event.origin);
  });
  for (const origin of origins) window.opener?.postMessage("authorizing:github", origin);
</script>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": "state=; Path=/callback; Max-Age=0",
    },
  });
}
