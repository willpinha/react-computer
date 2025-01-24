import fs from "fs";
import path from "path";

// YYYYMMDDHHMMSS
function createTimestamp() {
	const d = new Date();

	const year = d.getUTCFullYear();
	const month = d.getUTCMonth() + 1;
	const day = d.getUTCDate();
	const hours = d.getUTCHours();
	const minutes = d.getUTCMinutes();
	const seconds = d.getUTCSeconds();

	const pad = (n: number) => n.toString().padStart(2, "0");

	return `${year}${pad(month)}${pad(day)}${pad(hours)}${pad(minutes)}${pad(
		seconds
	)}`;
}

function readTemplate(name: string) {
	return fs.readFileSync(path.resolve("scripts", "templates", name), "utf-8");
}

function createFiles() {
	const timestamp = createTimestamp();

	const indexContent = readTemplate("Index.tsx");

	const metadataContent = readTemplate("metadata.ts");

	const newDirPath = path.resolve("src", "wiki", timestamp);

	fs.mkdirSync(newDirPath), { recursive: true };

	fs.writeFileSync(path.join(newDirPath, "Index.tsx"), indexContent);
	fs.writeFileSync(path.join(newDirPath, "metadata.ts"), metadataContent);

	console.log(`Component created at ${newDirPath}`);
}

createFiles();
