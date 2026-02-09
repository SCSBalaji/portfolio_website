# Deploying a Vite React App to a Google Cloud Platform VM

A complete step-by-step guide for deploying this portfolio website to a Google Cloud Platform (GCP) Compute Engine virtual machine.

---

## Table of Contents

1. [GCP Account Setup & Project Creation](#1-gcp-account-setup--project-creation)
2. [VM Instance Creation](#2-vm-instance-creation)
3. [SSH Access & Firewall Rules](#3-ssh-access--firewall-rules)
4. [Installing Node.js, Nginx, and Dependencies](#4-installing-nodejs-nginx-and-dependencies)
5. [Building the Project & Deploying](#5-building-the-project--deploying)
6. [Configuring Nginx](#6-configuring-nginx)
7. [Setting Up a Domain (Optional) & SSL](#7-setting-up-a-domain-optional--ssl)
8. [Updating the Deployment](#8-updating-the-deployment)

---

## 1. GCP Account Setup & Project Creation

### Create a GCP Account

1. Go to [https://cloud.google.com](https://cloud.google.com) and click **Get started for free**.
2. Sign in with your Google account and complete the billing setup. GCP offers a free tier with $300 in credits for new accounts.

### Create a Project

1. Open the [GCP Console](https://console.cloud.google.com).
2. Click the project dropdown at the top of the page and select **New Project**.
3. Enter a project name (e.g., `portfolio-website`) and click **Create**.
4. Make sure the new project is selected in the project dropdown.

Alternatively, use the `gcloud` CLI:

```bash
gcloud projects create portfolio-website --name="Portfolio Website"
gcloud config set project portfolio-website
```

---

## 2. VM Instance Creation

### Enable Compute Engine

1. In the GCP Console, navigate to **Compute Engine > VM instances**.
2. If prompted, click **Enable** to activate the Compute Engine API.

### Create a VM Instance

1. Click **Create Instance**.
2. Configure the instance:
   - **Name:** `portfolio-vm`
   - **Region/Zone:** Choose one close to your target audience (e.g., `us-central1-a`)
   - **Machine type:** `e2-micro` (free tier eligible) or `e2-small` for better performance
   - **Boot disk:** Click **Change**, select **Ubuntu 22.04 LTS** (or Debian 12), set disk size to 10–20 GB, and click **Select**
   - **Firewall:** Check both **Allow HTTP traffic** and **Allow HTTPS traffic**
3. Click **Create**.

Using the `gcloud` CLI:

```bash
gcloud compute instances create portfolio-vm \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB \
  --tags=http-server,https-server
```

---

## 3. SSH Access & Firewall Rules

### Connect via SSH

From the GCP Console, click the **SSH** button next to your VM instance. Alternatively, use the CLI:

```bash
gcloud compute ssh portfolio-vm --zone=us-central1-a
```

### Verify Firewall Rules

The HTTP/HTTPS checkboxes during VM creation should have added the necessary rules. Verify they exist:

```bash
gcloud compute firewall-rules list --filter="name~http"
```

If the rules are missing, create them manually:

```bash
gcloud compute firewall-rules create allow-http \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:80 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=http-server

gcloud compute firewall-rules create allow-https \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:443 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=https-server
```

---

## 4. Installing Node.js, Nginx, and Dependencies

SSH into your VM and run the following commands.

### Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js via nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
node --version
npm --version
```

### Install Git

```bash
sudo apt install -y git
```

### Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

Verify Nginx is running by visiting your VM's external IP in a browser. You should see the default Nginx welcome page.

---

## 5. Building the Project & Deploying

### Clone the Repository

```bash
cd ~
git clone https://github.com/<your-username>/portfolio_website.git
cd portfolio_website
```

### Install Dependencies and Build

```bash
npm install
npm run build
```

This generates a `dist/` directory containing the production-ready static files.

### Copy Build Output to the Nginx Web Root

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

---

## 6. Configuring Nginx

### Set Up Nginx as a Static File Server with SPA Support

Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif|glb|gltf|hdr)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length 256;
}
```

### Enable the Configuration

```bash
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm -f /etc/nginx/sites-enabled/default
```

### Test and Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Visit your VM's external IP address in a browser to confirm the site is live.

---

## 7. Setting Up a Domain (Optional) & SSL

### Point Your Domain to the VM

1. Find your VM's external IP address:

```bash
gcloud compute instances describe portfolio-vm \
  --zone=us-central1-a \
  --format="get(networkInterfaces[0].accessConfigs[0].natIP)"
```

2. Go to your domain registrar's DNS settings and create an **A record** pointing to the VM's external IP:
   - **Type:** A
   - **Name:** `@` (or your subdomain)
   - **Value:** Your VM's external IP
   - **TTL:** 300

3. If you also want `www` to work, add a second A record or a CNAME:
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** `yourdomain.com`

4. Update the Nginx configuration to use your domain:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Replace `server_name _;` with:

```nginx
server_name yourdomain.com www.yourdomain.com;
```

Then reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Install SSL with Let's Encrypt (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts to complete the SSL setup. Certbot will automatically configure Nginx to redirect HTTP to HTTPS.

### Verify Auto-Renewal

Certbot sets up a systemd timer for automatic renewal. Verify it is active:

```bash
sudo systemctl status certbot.timer
```

Test the renewal process:

```bash
sudo certbot renew --dry-run
```

---

## 8. Updating the Deployment

When you push changes to the repository, follow these steps to update the live site.

### Manual Update

SSH into the VM and run:

```bash
cd ~/portfolio_website
git pull origin main
npm install
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

### Optional: Create a Deploy Script

Create a reusable deploy script on the VM:

```bash
nano ~/deploy.sh
```

Add the following:

```bash
#!/usr/bin/env bash
set -euo pipefail

cd ~/portfolio_website
git pull origin main
npm install
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
echo "Deployment complete."
```

Make it executable:

```bash
chmod +x ~/deploy.sh
```

Run it whenever you need to deploy:

```bash
~/deploy.sh
```
