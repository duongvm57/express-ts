## Installation

```bash
$ cp .env.example .env
$ docker-compose up -d
```

## Database
```bash
$ docker-compose exec app sh
$ npx prisma db push
$ npx prisma db seed
```

## PGAdmin to manager database
```bash
# localhost:8080
# with user and password in env file
```