# WolfTech Global — Installation Guide

`WolfTechGlobal.jar` is a self-contained executable Spring Boot application. It includes the Java backend, HTML pages, CSS, JavaScript, animations, images, icons, fonts configuration, forms, and favicon.

This package contains the v49 experience build: responsive dark/light themes, cinematic case studies, service-specific visual systems, page and section transitions, the interactive System Explorer, enhanced forms with local draft recovery, optional interface sound, and accessibility-aware reduced-motion support.

## Requirements

- Java 8 or newer. Java 17 or 21 LTS is recommended for a new server.
- At least 256 MB free RAM.
- Port 8080 available, or choose another port.

Check Java:

```text
java -version
```

If Java is missing, install Eclipse Temurin from https://adoptium.net/.

## Windows

1. Copy this entire `distribution` folder to the new computer.
2. Double-click `START-WOLFTECH.bat`.
3. Open http://localhost:8080.

Alternatively, open Command Prompt in this folder and run:

```text
java -jar WolfTechGlobal.jar
```

## Linux server

Copy the files to the server, then run:

```sh
chmod +x start-wolftech.sh
./start-wolftech.sh
```

Open `http://SERVER-IP:8080`. Allow TCP port 8080 in the server firewall when remote access is required.

## Use a different port

Windows Command Prompt:

```text
set PORT=9090
java -jar WolfTechGlobal.jar
```

Windows PowerShell:

```powershell
$env:PORT=9090
java -jar WolfTechGlobal.jar
```

Linux:

```sh
PORT=9090 java -jar WolfTechGlobal.jar
```

## Run continuously on Linux with systemd

Place the files in `/opt/wolftech`, then create `/etc/systemd/system/wolftech.service`:

```ini
[Unit]
Description=WolfTech Global website
After=network.target

[Service]
User=www-data
WorkingDirectory=/opt/wolftech
ExecStart=/usr/bin/java -jar /opt/wolftech/WolfTechGlobal.jar
Environment=PORT=8080
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable it:

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now wolftech
sudo systemctl status wolftech
```

## Production domain and HTTPS

For a public deployment, put Nginx, Apache, Caddy, or a cloud load balancer in front of the application. Proxy the public HTTPS domain to `127.0.0.1:8080`. Do not expose administrative server access publicly.

## Stop the application

- Terminal mode: press `Ctrl+C`.
- systemd: `sudo systemctl stop wolftech`.

## Upgrade

Stop the old application, replace only `WolfTechGlobal.jar` with the newer file, and start it again. Keep the same launcher and service configuration.

## Troubleshooting

- `java is not recognized`: install Java and reopen the terminal.
- `Port 8080 already in use`: choose another port using `PORT` as shown above.
- Remote browser cannot connect: allow the selected port in the firewall or configure a reverse proxy.
- Verify locally with `http://localhost:8080`.
