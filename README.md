# api-gateway-bff

API Gateway y Backend-for-Frontend (BFF). Punto de entrada unificado para aplicaciones cliente con rate limiting, composición de microservicios y proxy reverso transparente.

## ✅ Completado

- **Gateway Express con rate limiting integrado**:
  - Global: 100 requests/15min por IP
  - Auth: 5 requests/15min por IP
  - Tickets/Payments: 30 requests/min por IP
- **Proxy reverso transparente**:
  - Enrutamiento a servicios backend (tickets, auth, payments)
  - Composición con axios
  - Timeouts configurables (5-10s por servicio)
- **Manejo de errores**:
  - Respuestas 503 cuando servicio no disponible
  - Headers CORS automáticos
  - 404 para rutas no encontradas
- **6 tests pasando**: health, 404, proxy, rate limit, servicios unavailable, CORS
- **Backend CI workflow**: incluido `.github/workflows/backend-ci.yml`

## Stack

- **Runtime**: Node.js 20 LTS
- **Language**: TypeScript 5.2
- **Framework**: Express 4.18
- **Rate Limiting**: express-rate-limit 7.1
- **HTTP Client**: axios 1.6
- **Testing**: Jest 29.6 + supertest 7.1

## Quick Start

```bash
cd api-gateway-bff
npm install
npm run dev        # puerto 3000
```

## Run Tests

```bash
npm test           # 6 tests passing
```

## Environment Variables

- `PORT`: Puerto del gateway (default: 3000)
- `TICKETS_SERVICE_URL`: URL servicio de tickets (default: http://localhost:3001)
- `AUTH_SERVICE_URL`: URL servicio de auth (default: http://localhost:3002)
- `PAYMENTS_SERVICE_URL`: URL servicio de payments (default: http://localhost:3003)
- `NOTIFICATIONS_SERVICE_URL`: URL servicio de notificaciones (default: http://localhost:3004)

## Rate Limiting

- **Global**: 100 requests por 15 minutos por IP
- **Auth**: 5 requests por 15 minutos por IP (útil contra brute force)
- **Tickets/Payments**: 30 requests por minuto por IP

## Endpoints Proxy

- `GET /health` - Health check del gateway
- `POST /api/auth/*` - Proxea a auth service (con auth limiter)
- `GET|POST /api/tickets/*` - Proxea a tickets service
- `GET|POST /api/payments/*` - Proxea a payments service

## Ejemplo de uso

```bash
# Terminal 1: ticketing-core-service
cd /home/jlg/nft/ticketing-core-service && npm run dev

# Terminal 2: users-identity-service
cd /home/jlg/nft/users-identity-service && npm run dev

# Terminal 3: api-gateway-bff
cd /home/jlg/nft/api-gateway-bff && npm run dev

# Luego hacer requests al gateway:
curl http://localhost:3000/health
curl http://localhost:3000/api/tickets          # proxea a :3001
curl http://localhost:3000/api/auth/login       # proxea a :3002
```

## Arquitectura

El gateway actúa como mediador entre clientes y servicios backend:

```
Client -> Gateway (3000) -> Rate Limiter -> Proxy -> Backend Service
                    |
                    +-> CORS
                    |
                    +-> Error Handling
```

## Build & Deploy

```bash
npm run build      # compila TypeScript a dist/
npm start          # ejecuta dist/index.js
```

## Docker

```bash
docker build -t api-gateway-bff .
docker run -p 3000:3000 api-gateway-bff
```

## Próximos pasos

- Circuit breaker pattern para resilencia
- Caching de respuestas
- Load balancing entre instancias de servicios
- Authentication/Authorization middleware
- GraphQL gateway
- OpenAPI/Swagger documentation
