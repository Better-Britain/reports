import fs from "node:fs";
import path from "node:path";

function addTrailingSlashRedirect(req, res, next) {
  const url = req.url || "/";
  const pathname = url.split("?")[0];

  if (!pathname || pathname === "/" || pathname.endsWith("/") || path.extname(pathname)) {
    next();
    return;
  }

  const relPath = pathname.replace(/^\/+/, "");
  const indexPath = path.join(process.cwd(), "docs", relPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    next();
    return;
  }

  const query = url.slice(pathname.length);
  res.statusCode = 308;
  res.setHeader("Location", `${pathname}/${query}`);
  res.end();
}

const slashRedirectPlugin = {
  name: "slash-redirect-existing-index",
  configureServer(server) {
    server.middlewares.use(addTrailingSlashRedirect);
  },
  configurePreviewServer(server) {
    server.middlewares.use(addTrailingSlashRedirect);
  },
};

export default {
  root: "docs",
  appType: "mpa",
  plugins: [slashRedirectPlugin],
  server: {
    open: true,
    port: 5173,
    strictPort: true,
    host: true
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: true
  }
};
