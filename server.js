(async () => {
  const http = await import("node:http");
  const fs = await import("node:fs");
  const path = await import("node:path");

  const PORT = 3000;

  const MIME_TYPES: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };

  const server = http.createServer((req, res) => {
    const url = req.url || "/";
    let filePath = "." + url;
    if (filePath === "./") filePath = "./index.html";

    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          res.writeHead(404);
          res.end("404 Not Found");
          return;
        }
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${(error as NodeJS.ErrnoException).code} ..\n`);
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
})();
