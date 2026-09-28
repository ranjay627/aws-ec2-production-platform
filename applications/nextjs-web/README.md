Fieldnotes is a Next.js client for the Spring Boot in-memory CRUD API.

## Run locally

Start the API in one terminal:

```bash
cd production-spring-boot-app
./mvnw spring-boot:run
```

Start the web app in another terminal:

```bash
cd production-next-js-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API defaults to `http://localhost:8080/api`; set `NEXT_PUBLIC_API_URL` to use a different base URL.

## Resources

The web app has separate pages for `/products`, `/categories`, `/customers`, and `/orders`. Each page supports create, list, read-by-ID through the API, edit, delete, and search.

Each API resource supports `GET /api/{resource}`, `GET /api/{resource}/{id}`, `POST /api/{resource}`, `PUT /api/{resource}/{id}`, and `DELETE /api/{resource}/{id}`. Data is held in memory and is cleared when the Spring Boot app restarts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
