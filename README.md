# Empty Encore TS Template

## Developing locally

When you have [installed Encore](https://encore.dev/docs/install), you can create a new Encore application and clone
this example with this command.

```bash
encore app create my-app-name --example=ts/empty
```

## Running locally

```bash
encore run
```

While `encore run` is running, open <http://localhost:9400/> to view
Encore's [local developer dashboard](https://encore.dev/docs/observability/dev-dash).

## Deployment

Deploy your application to a staging environment in Encore's free development cloud:

```bash
git add -A .
git commit -m 'Commit message'
git push encore
```

Then head over to the [Cloud Dashboard](https://app.encore.dev) to monitor your deployment and find your production URL.

From there you can also connect your own AWS or GCP account to use for deployment.

Now off you go into the clouds!

## Testing

```bash
encore test
```

## Run SQL from Cloud 

1. Open DOCKER 
2. Run CMD on TERMINAL 

```bash
encore db shell  <database-name>
```

#### with DB name is "student"

```bash
encore db shell  student
```

### Connect to DB on DOCKER / CLOUD 

```bash
\c student 
```
```sql
SELECT * FROM student;
```

>> Reminder `;` in SQL query 



