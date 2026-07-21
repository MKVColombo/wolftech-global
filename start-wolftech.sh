#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
PORT="${PORT:-8080}"
echo "Starting WolfTech Global at http://localhost:${PORT}"
exec java -jar WolfTechGlobal.jar

