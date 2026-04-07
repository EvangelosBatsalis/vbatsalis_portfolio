# 🐳 Docker Compose - Ultimate Guide & Cheat Sheet

> Το πιο ολοκληρωμένο Docker Compose tutorial που χρειάζεσαι!

---

## 📚 Πίνακας Περιεχομένων

1. [Βασικές Έννοιες](#-βασικές-έννοιες)
2. [Δομή Αρχείου](#-δομή-αρχείου)
3. [Βασικές Εντολές](#-βασικές-εντολές)
4. [Services Configuration](#-services-configuration)
5. [Networks & Volumes](#-networks--volumes)
6. [Environment Variables](#-environment-variables)
7. [Πρακτικά Παραδείγματα](#-πρακτικά-παραδείγματα)
8. [Best Practices](#-best-practices)
9. [Troubleshooting](#-troubleshooting)

---

## 🎯 Βασικές Έννοιες

### Τι είναι το Docker Compose;
Το Docker Compose είναι εργαλείο για να ορίζεις και να τρέχεις multi-container Docker applications. Χρησιμοποιείς ένα YAML αρχείο για να configure τα services της εφαρμογής σου.

### Γιατί να το χρησιμοποιήσεις;
- ✅ Ορίζεις όλα τα services σε ένα αρχείο
- ✅ Start/Stop όλα τα containers με μία εντολή
- ✅ Reproducible environments
- ✅ Service dependencies και networking
- ✅ Development & Production parity

---

## 📋 Δομή Αρχείου

### Βασική Δομή `docker-compose.yml`

```yaml
version: '3.8'  # Η έκδοση του Compose file format

services:       # Ορισμός των containers
  service_name:
    # Container configuration
    
volumes:        # Persistent data storage
  volume_name:
  
networks:       # Custom networking
  network_name:
```

### Ιεραρχία Αρχείων

```
project/
├── docker-compose.yml          # Main compose file
├── docker-compose.override.yml # Local overrides (auto-loaded)
├── docker-compose.prod.yml     # Production config
├── .env                        # Environment variables
└── services/
    ├── service1/
    │   └── Dockerfile
    └── service2/
        └── Dockerfile
```

---

## ⚡ Βασικές Εντολές

### Διαχείριση Services

```bash
# Start όλα τα services (detached mode)
docker compose up -d

# Start συγκεκριμένο service
docker compose up -d service_name

# Rebuild και start
docker compose up -d --build

# Stop όλα τα services
docker compose down

# Stop και διαγραφή volumes
docker compose down -v

# Restart όλα τα services
docker compose restart

# Restart συγκεκριμένο service
docker compose restart service_name

# Stop χωρίς διαγραφή
docker compose stop

# Start existing containers
docker compose start
```

### Viewing & Monitoring

```bash
# Δες τα running containers
docker compose ps

# Δες τα logs
docker compose logs

# Follow logs (realtime)
docker compose logs -f

# Logs για συγκεκριμένο service
docker compose logs -f service_name

# Logs με timestamps
docker compose logs -f -t

# Τελευταίες 100 γραμμές
docker compose logs --tail=100

# Δες processes
docker compose top

# Δες events
docker compose events
```

### Execution & Debugging

```bash
# Execute εντολή σε running container
docker compose exec service_name command

# Interactive shell
docker compose exec service_name bash

# Run one-off command
docker compose run service_name command

# Validate compose file
docker compose config

# Validate και δες το merged config
docker compose config --services

# Pull όλα τα images
docker compose pull

# Build όλα τα images
docker compose build

# Build χωρίς cache
docker compose build --no-cache
```

### Advanced Commands

```bash
# Scale services
docker compose up -d --scale service_name=3

# Pause services
docker compose pause

# Unpause services
docker compose unpause

# Διαγραφή stopped containers
docker compose rm

# Force διαγραφή
docker compose rm -f

# Δες port mappings
docker compose port service_name 80
```

---

## 🔧 Services Configuration

### Build Context

```yaml
services:
  webapp:
    # Απλό build
    build: ./path/to/dockerfile
    
    # Extended build configuration
    build:
      context: ./app
      dockerfile: Dockerfile.dev
      args:
        - NODE_ENV=development
        - VERSION=1.0
      target: development  # Multi-stage build target
      cache_from:
        - myapp:cache
```

### Image & Container

```yaml
services:
  webapp:
    image: nginx:alpine                  # Pull από registry
    container_name: my-nginx             # Custom container name
    hostname: web-server                 # Container hostname
    domainname: example.com             # Domain name
    restart: unless-stopped              # Restart policy
    # restart options: no, always, on-failure, unless-stopped
```

### Ports & Expose

```yaml
services:
  webapp:
    ports:
      # HOST:CONTAINER
      - "8080:80"           # HTTP
      - "443:443"           # HTTPS
      - "3000-3005:3000"    # Port range
      - "127.0.0.1:8001:8001"  # Bind to localhost only
      
    expose:
      - "3000"              # Expose χωρίς publish (inter-container)
```

### Environment Variables

```yaml
services:
  webapp:
    # Inline
    environment:
      - NODE_ENV=production
      - DEBUG=false
      - API_KEY=your_key_here
      
    # Dictionary format
    environment:
      NODE_ENV: production
      DEBUG: "false"
      
    # Από .env file
    env_file:
      - .env
      - .env.local
```

### Volumes & Bind Mounts

```yaml
services:
  webapp:
    volumes:
      # Named volume
      - data-volume:/var/lib/data
      
      # Bind mount (host:container)
      - ./app:/usr/src/app
      
      # Bind mount με read-only
      - ./config:/etc/config:ro
      
      # Anonymous volume
      - /var/log
      
      # Long syntax
      - type: bind
        source: ./app
        target: /app
        read_only: false
      
      - type: volume
        source: data-volume
        target: /data
        volume:
          nocopy: true
```

### Dependencies & Ordering

```yaml
services:
  webapp:
    depends_on:
      # Simple dependencies
      - db
      - redis
      
    # Advanced με health checks
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
```

### Health Checks

```yaml
services:
  webapp:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Resource Limits

```yaml
services:
  webapp:
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Logging

```yaml
services:
  webapp:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "production"
```

---

## 🌐 Networks & Volumes

### Networks Configuration

```yaml
networks:
  # Default network
  frontend:
    driver: bridge
    
  # Custom network με options
  backend:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 10.10.220.0/24
          gateway: 10.10.220.1
    driver_opts:
      com.docker.network.bridge.name: br-backend
      
  # External network
  existing_network:
    external: true
    name: my_existing_network

services:
  webapp:
    networks:
      - frontend
      - backend
      
  db:
    networks:
      backend:
        ipv4_address: 10.10.220.10
```

### Volumes Configuration

```yaml
volumes:
  # Simple named volume
  db-data:
  
  # Volume με driver options
  app-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /path/on/host
      
  # External volume
  existing-volume:
    external: true
    name: my_existing_volume
    
  # NFS volume
  nfs-data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=192.168.1.100,rw
      device: ":/path/to/share"
```

---

## 🔐 Environment Variables

### .env File Format

```bash
# .env file
COMPOSE_PROJECT_NAME=myproject
NODE_ENV=production
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_NAME=mydb
DATABASE_USER=postgres
DATABASE_PASSWORD=secret_password

# API Keys
API_KEY=your_api_key_here
API_SECRET=your_secret_here

# Versions
POSTGRES_VERSION=15-alpine
REDIS_VERSION=7-alpine
```

### Χρήση στο compose file

```yaml
services:
  webapp:
    image: node:${NODE_VERSION:-18-alpine}  # Default value
    environment:
      - NODE_ENV=${NODE_ENV}
      - DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}
```

### Variable Substitution

```yaml
# Default values
${VARIABLE:-default}      # Χρήση default αν δεν υπάρχει
${VARIABLE-default}       # Χρήση default αν δεν είναι set
${VARIABLE:?error}        # Error αν δεν υπάρχει
${VARIABLE?error}         # Error αν δεν είναι set
```

---

## 🚀 Πρακτικά Παραδείγματα

### 1. NGINX Reverse Proxy με Caddy

```yaml
version: '3.8'

services:
  caddy:
    image: caddy:2-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      - caddy-config:/config
    networks:
      - proxy

  webapp:
    image: nginx:alpine
    container_name: webapp
    restart: unless-stopped
    expose:
      - "80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    networks:
      - proxy

volumes:
  caddy-data:
  caddy-config:

networks:
  proxy:
    name: proxy_network
    driver: bridge
```

### 2. Full Stack App (React + Node + PostgreSQL + Redis)

```yaml
version: '3.8'

services:
  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: react-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend
    networks:
      - app-network
    volumes:
      - ./frontend/src:/app/src
      - /app/node_modules

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: node-api
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    volumes:
      - ./backend/src:/app/src
      - /app/node_modules

  # Database
  db:
    image: postgres:15-alpine
    container_name: postgres-db
    restart: unless-stopped
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Cache
  redis:
    image: redis:7-alpine
    container_name: redis-cache
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network
    command: redis-server --appendonly yes

  # Admin Tool
  adminer:
    image: adminer:latest
    container_name: db-admin
    restart: unless-stopped
    ports:
      - "8080:8080"
    depends_on:
      - db
    networks:
      - app-network
    environment:
      - ADMINER_DEFAULT_SERVER=db

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### 3. Portainer Stack

```yaml
version: '3.8'

services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    ports:
      - "9000:9000"
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - portainer-data:/data
    networks:
      - management

  portainer-agent:
    image: portainer/agent:latest
    container_name: portainer-agent
    restart: unless-stopped
    ports:
      - "9001:9001"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /var/lib/docker/volumes:/var/lib/docker/volumes
    networks:
      - management

volumes:
  portainer-data:

networks:
  management:
    driver: bridge
    ipam:
      config:
        - subnet: 10.10.99.0/24
```

### 4. WordPress με MySQL

```yaml
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    container_name: wordpress
    restart: unless-stopped
    ports:
      - "8000:80"
    environment:
      - WORDPRESS_DB_HOST=db:3306
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress_password
      - WORDPRESS_DB_NAME=wordpress
    volumes:
      - wordpress-data:/var/www/html
      - ./wp-content:/var/www/html/wp-content
    depends_on:
      - db
    networks:
      - wordpress-network

  db:
    image: mysql:8.0
    container_name: wordpress-db
    restart: unless-stopped
    environment:
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress_password
      - MYSQL_ROOT_PASSWORD=root_password
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - wordpress-network
    command: '--default-authentication-plugin=mysql_native_password'

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: phpmyadmin
    restart: unless-stopped
    ports:
      - "8081:80"
    environment:
      - PMA_HOST=db
      - PMA_USER=root
      - PMA_PASSWORD=root_password
    depends_on:
      - db
    networks:
      - wordpress-network

volumes:
  wordpress-data:
  db-data:

networks:
  wordpress-network:
    driver: bridge
```

### 5. Monitoring Stack (Prometheus + Grafana)

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.enable-lifecycle'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning:ro
    depends_on:
      - prometheus
    networks:
      - monitoring

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    networks:
      - monitoring

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    restart: unless-stopped
    ports:
      - "8082:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring

volumes:
  prometheus-data:
  grafana-data:

networks:
  monitoring:
    driver: bridge
```

### 6. Development Environment με Hot Reload

```yaml
version: '3.8'

services:
  # Next.js Frontend
  nextjs:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: nextjs-dev
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - WATCHPACK_POLLING=true
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
    networks:
      - dev-network

  # Spring Boot Backend
  spring-boot:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: spring-boot-dev
    restart: unless-stopped
    ports:
      - "8000:8080"
      - "5005:5005"  # Debug port
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - SPRING_DEVTOOLS_RESTART_ENABLED=true
      - JAVA_TOOL_OPTIONS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
    volumes:
      - ./backend/src:/app/src
      - maven-cache:/root/.m2
    depends_on:
      - postgres
    networks:
      - dev-network

  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: postgres-dev
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=devdb
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=devpass
    volumes:
      - postgres-dev-data:/var/lib/postgresql/data
    networks:
      - dev-network

volumes:
  postgres-dev-data:
  maven-cache:

networks:
  dev-network:
    driver: bridge
```

### 7. ERPNext Stack

```yaml
version: '3.8'

services:
  # ERPNext Backend
  erpnext-backend:
    image: frappe/erpnext:latest
    container_name: erpnext-backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - SITE_NAME=erp.local
      - DB_HOST=mariadb
      - DB_PORT=3306
      - REDIS_CACHE=redis-cache:6379
      - REDIS_QUEUE=redis-queue:6379
      - REDIS_SOCKETIO=redis-socketio:6379
    volumes:
      - erpnext-sites:/home/frappe/frappe-bench/sites
      - erpnext-logs:/home/frappe/frappe-bench/logs
    depends_on:
      - mariadb
      - redis-cache
      - redis-queue
      - redis-socketio
    networks:
      - erpnext-network

  # MariaDB
  mariadb:
    image: mariadb:10.6
    container_name: erpnext-db
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=admin
    volumes:
      - mariadb-data:/var/lib/mysql
    networks:
      - erpnext-network
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

  # Redis Services
  redis-cache:
    image: redis:alpine
    container_name: erpnext-redis-cache
    restart: unless-stopped
    networks:
      - erpnext-network

  redis-queue:
    image: redis:alpine
    container_name: erpnext-redis-queue
    restart: unless-stopped
    networks:
      - erpnext-network

  redis-socketio:
    image: redis:alpine
    container_name: erpnext-redis-socketio
    restart: unless-stopped
    networks:
      - erpnext-network

volumes:
  erpnext-sites:
  erpnext-logs:
  mariadb-data:

networks:
  erpnext-network:
    driver: bridge
```

---

## 💡 Best Practices

### 1. Project Organization

```bash
# Καλή δομή project
myproject/
├── docker-compose.yml
├── .env.example              # Template για .env
├── .env                      # Actual env vars (στο .gitignore)
├── .dockerignore
├── README.md
├── services/
│   ├── frontend/
│   │   ├── Dockerfile
│   │   ├── Dockerfile.dev
│   │   └── src/
│   └── backend/
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       └── src/
└── config/
    ├── nginx/
    ├── postgres/
    └── redis/
```

### 2. Security Best Practices

```yaml
services:
  webapp:
    # ✅ Χρήση specific versions
    image: nginx:1.25-alpine
    
    # ✅ Non-root user
    user: "1000:1000"
    
    # ✅ Read-only root filesystem
    read_only: true
    
    # ✅ Security options
    security_opt:
      - no-new-privileges:true
    
    # ✅ Capabilities drop
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    
    # ✅ Secrets από environment
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
    
    # ❌ ΠΟΤΕ hardcoded passwords
    # environment:
    #   - DB_PASSWORD=mysecretpassword  # WRONG!
```

### 3. Production vs Development

```yaml
# docker-compose.yml (base)
version: '3.8'
services:
  webapp:
    image: myapp:latest
    environment:
      - NODE_ENV=${NODE_ENV}

# docker-compose.override.yml (development - auto-loaded)
version: '3.8'
services:
  webapp:
    build: .
    volumes:
      - ./src:/app/src
    ports:
      - "3000:3000"
    environment:
      - DEBUG=true

# docker-compose.prod.yml (production)
version: '3.8'
services:
  webapp:
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

```bash
# Development (auto-loads override)
docker compose up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Health Checks

```yaml
services:
  webapp:
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
      
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      
  redis:
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
```

### 5. Resource Management

```yaml
services:
  webapp:
    # Development - unlimited resources
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
    
    # Restart policy
    restart: unless-stopped
    
    # PID limit
    pids_limit: 100
```

### 6. Logging Best Practices

```yaml
services:
  webapp:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        compress: "true"
        labels: "app,environment"
        env: "NODE_ENV,APP_VERSION"
```

### 7. Naming Conventions

```yaml
# ✅ Descriptive names
services:
  frontend-webapp:
    container_name: myproject-frontend
    
  backend-api:
    container_name: myproject-api
    
  postgres-db:
    container_name: myproject-postgres

# Volumes με prefix
volumes:
  myproject-postgres-data:
  myproject-redis-cache:

# Networks με context
networks:
  myproject-frontend:
  myproject-backend:
```

---

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use

```bash
# Βρες τι χρησιμοποιεί το port
sudo lsof -i :8080
# ή
sudo netstat -tulpn | grep :8080

# Kill το process
sudo kill -9 <PID>

# Ή άλλαξε το port στο compose file
ports:
  - "8081:80"  # Changed from 8080
```

#### 2. Container Keeps Restarting

```bash
# Δες τα logs
docker compose logs -f service_name

# Δες το exit code
docker compose ps

# Inspect το container
docker inspect container_name

# Check health status
docker compose ps --format json | jq '.[].Health'
```

#### 3. Cannot Connect to Database

```yaml
# Βεβαιώσου ότι:
# 1. Dependencies είναι correct
services:
  webapp:
    depends_on:
      db:
        condition: service_healthy  # Wait for health check
        
# 2. Same network
    networks:
      - backend
      
  db:
    networks:
      - backend

# 3. Correct hostname (service name)
environment:
  - DATABASE_HOST=db  # Not localhost!
```

#### 4. Volume Permission Issues

```bash
# Αν βλέπεις permission errors:

# 1. Check τα permissions
ls -la /path/to/volume

# 2. Fix ownership
sudo chown -R 1000:1000 /path/to/volume

# 3. Ή χρήση user στο compose
services:
  webapp:
    user: "1000:1000"
```

#### 5. Build Cache Issues

```bash
# Clear build cache
docker compose build --no-cache

# Remove dangling images
docker image prune

# Full cleanup
docker system prune -a --volumes
```

#### 6. Network Issues

```bash
# Δες τα networks
docker network ls

# Inspect network
docker network inspect network_name

# Recreate network
docker compose down
docker network rm network_name
docker compose up -d
```

### Debugging Commands

```bash
# Inspect τα πάντα
docker compose config

# Check το environment
docker compose exec service_name env

# Network connectivity test
docker compose exec service_name ping other_service

# DNS resolution test
docker compose exec service_name nslookup other_service

# File system check
docker compose exec service_name ls -la /path

# Process check
docker compose exec service_name ps aux

# Resource usage
docker stats

# Detailed container info
docker compose exec service_name sh -c 'df -h'
docker compose exec service_name sh -c 'free -m'
```

---

## 📊 Advanced Patterns

### 1. Multi-Stage Compose για Different Environments

```bash
# Directory structure
├── docker-compose.yml          # Base
├── docker-compose.dev.yml      # Development
├── docker-compose.test.yml     # Testing
├── docker-compose.prod.yml     # Production
└── docker-compose.staging.yml  # Staging
```

```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Testing
docker compose -f docker-compose.yml -f docker-compose.test.yml run tests
```

### 2. Service Profiles

```yaml
version: '3.8'

services:
  webapp:
    # Always starts
    
  db:
    # Always starts
    
  debug-tools:
    profiles: ["debug"]
    image: nicolaka/netshoot
    
  test-runner:
    profiles: ["test"]
    build:
      context: ./tests
```

```bash
# Normal start (without profiles)
docker compose up

# With debug profile
docker compose --profile debug up

# Multiple profiles
docker compose --profile debug --profile test up
```

### 3. Extends & Anchors

```yaml
# Using YAML anchors
version: '3.8'

x-common-config: &common
  restart: unless-stopped
  logging:
    driver: "json-file"
    options:
      max-size: "10m"
      max-file: "3"

x-app-defaults: &app-defaults
  <<: *common
  networks:
    - app-network
  environment: &app-env
    NODE_ENV: ${NODE_ENV}
    LOG_LEVEL: info

services:
  frontend:
    <<: *app-defaults
    image: frontend:latest
    ports:
      - "3000:3000"
      
  backend:
    <<: *app-defaults
    image: backend:latest
    ports:
      - "8000:8000"
    environment:
      <<: *app-env
      DATABASE_URL: postgresql://db:5432/mydb
```

---

## 🎓 Pro Tips

### 1. Quick Aliases

```bash
# Πρόσθεσέ τα στο ~/.bashrc ή ~/.zshrc
alias dcu='docker compose up -d'
alias dcd='docker compose down'
alias dcl='docker compose logs -f'
alias dcp='docker compose ps'
alias dcr='docker compose restart'
alias dce='docker compose exec'
alias dcb='docker compose build --no-cache'
alias dclean='docker compose down -v && docker system prune -af'
```

### 2. Watch for Changes

```bash
# Auto-restart on compose file changes
watch -n 2 'docker compose config && docker compose up -d'
```

### 3. Quick Health Check Script

```bash
#!/bin/bash
# health-check.sh

services=$(docker compose ps --services)

for service in $services; do
    status=$(docker compose ps --format json $service | jq -r '.[0].Health')
    echo "$service: $status"
done
```

### 4. Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"

# Stop containers
docker compose stop

# Backup volumes
for volume in $(docker volume ls --format '{{.Name}}' | grep myproject); do
    docker run --rm \
        -v $volume:/data \
        -v $BACKUP_DIR:/backup \
        alpine tar czf /backup/${volume}_${DATE}.tar.gz -C /data .
done

# Start containers
docker compose start

echo "Backup completed: $BACKUP_DIR"
```

### 5. Environment Validation

```bash
#!/bin/bash
# validate-env.sh

required_vars=(
    "NODE_ENV"
    "DATABASE_URL"
    "REDIS_URL"
    "JWT_SECRET"
)

missing=()
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing+=("$var")
    fi
done

if [ ${#missing[@]} -ne 0 ]; then
    echo "Missing required environment variables:"
    printf '%s\n' "${missing[@]}"
    exit 1
fi

echo "All required environment variables are set!"
```

---

## 📚 Χρήσιμα Resources

### Official Documentation
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### Tools
- [Compose Validator](https://github.com/docker/compose/releases)
- [Docker Compose UI](https://github.com/francescou/docker-compose-ui)
- [Portainer](https://www.portainer.io/)
- [Lazydocker](https://github.com/jesseduffield/lazydocker)

### Version Checking

```bash
# Check Docker version
docker --version

# Check Compose version
docker compose version

# Check Compose file validity
docker compose config

# Validate και format
docker compose config --format yaml
```

---

## 🎯 Quick Reference Card

```bash
# LIFECYCLE
docker compose up -d              # Start
docker compose down               # Stop & remove
docker compose restart            # Restart
docker compose pause              # Pause
docker compose unpause            # Unpause

# BUILDING
docker compose build              # Build images
docker compose build --no-cache   # Build without cache
docker compose pull               # Pull images

# VIEWING
docker compose ps                 # List containers
docker compose logs -f            # Follow logs
docker compose top                # Show processes
docker compose images             # List images

# EXECUTION
docker compose exec SERVICE bash  # Shell into container
docker compose run SERVICE CMD    # Run one-off command

# MAINTENANCE
docker compose down -v            # Remove volumes
docker system prune -af           # Clean everything
docker volume prune               # Clean volumes

# VALIDATION
docker compose config             # Validate & view
docker compose config --services  # List services
```

---

## 🚀 Το Επόμενο Βήμα

Τώρα που έχεις όλα τα tools, δημιούργησε το δικό σου stack:

1. **Ξεκίνα απλά** - Ένα service κάθε φορά
2. **Test locally** - Βεβαιώσου ότι δουλεύει
3. **Add complexity** - Πρόσθεσε services σιγά σιγά
4. **Document** - Γράψε README για το project σου
5. **Version control** - Commit τα compose files σου
6. **Automate** - Scripts για common tasks
7. **Monitor** - Πρόσθεσε monitoring και logging
8. **Backup** - Regular backups των volumes

---

**Made with 🐳 για το infrastructure σου!**

*Pro tip: Κράτα αυτό το file σαν reference και προσάρμοσέ το στις ανάγκες σου!*
