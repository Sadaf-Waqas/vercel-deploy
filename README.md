# MakerKit - SaaS Starter for Next.js and Firebase

MakerKit is a SaaS starter project built with Next.js, Firebase and Tailwind 
CSS.

## Quick Start

### Requirements

- Node.js
- Git
- Java (for the Firebase Emulators)

Please ensure you installed these before proceeding.

### Cloning the Repository

Clone this repository and name it according to your preferences:

```
git clone https://github.com/makerkit/next-firebase-saas-kit.git your-saas 
--depth=1
```

Move to the folder just cloned:

```
cd your-saas 
```

Reinitialize Git and set this repository as your upstream fork, so you can 
pull updates when needed:

```
rm -rf .git
git init
git remote add upstream https://github.com/makerkit/next-firebase-saas-kit
```

We recommend to watch to the repository, so you know when there's an update. 
To pull the latest updates, use:

```
git pull upstream main --allow-unrelated-histories
```

In case we change the same files, you will need to resolve the conflicts.

Alternatively, you can cherry-pick changes so to reduce the amount of 
conflicts across the files.

### Installing the Node Modules

Install the Node modules with the following command:

```
npm i
```

### Starting the Next.js server and the Firebase Emulators

Start the application and the Firebase emulators:

```
nvm use --lts (use latest node)
npm run dev
npm run firebase:emulators:start
```

The application should be running at [http://localhost:3000](http://localhost:3000).

Additionally, the [Firebase Emulators UI](https://firebase.google.
com/docs/emulator-suite) should be running at 
[http://localhost:4000](http://localhost:4000).

If you're testing Stripe, also run the Stripe server:

```
npm run stripe:listen
```

Then, copy the printed webhook key and add it to your environment files. 
This can also be used for running the E2E tests.

My recommendation is to add it to both `.env.test` and `.env.development`.

### After Creating your Firebase Project

Make sure to update the environment files with your project's configuration. 
To do so, create the file `.env.production` copied from `.env.production.
template`, and fill the environment variables with the values from your 
Firebase project's configuration.

This is particularly important when:

1. **Running the build process**: You're building the project with `npm build` 
   because it uses the production environment
2. **Deploying to Vercel**: Of course, when you're publishing the project to 
   Vercel, as it will execute `npm build` on the CI

### Testing Emails

To test emails - since version 0.14.2, the kit uses InBucket, a platform to 
test emails locally. InBucket saves time during development since we can test 
our emails without setting up a real SMTP service - and works locally and 
offline.

To run the InBucket platform, we need Docker running on our machine. To 
start the InBucket service, run the following command:

```
npm run inbucket:start
```

InBucket is used by default during development. Instead, for production 
usage, you will need to set up a real SMTP service.

### Running Tests

To run the Cypress tests, please run the command:

```
npm test
```

NB: this command will start all the services required, execute the tests and 
then exit.

#### Stripe Testing

To run the Stripe tests and enable Stripe in development mode, you need to:

1. Enable the tests using the environment variable `ENABLE_STRIPE_TESTING` in 
`.env.test`
2. Have Docker installed and running in your local machine to run the Stripe CLI
3. Generate a webhook key and set the environment variable 
   `STRIPE_WEBHOOK_SECRET` and the other required Stripe environment variables

The first two steps are only required to run the Cypress E2E tests for 
Stripe. Generating a webhook key and running the Stripe CLI server is 
always required for developing your Stripe functionality locally.

The variables should be added either in `.env.test` or as part of your CI environment.

NB: The secret keys should not be added to the repository - even
though these are test keys. Instead - please add them to your CI
environment - such as Github Actions.

The test API keys should be added as secrets - while the variable
`ENABLE_STRIPE_TESTING` should be added as a simple variable.

To generate a webhook key, run the following command:

```
npm run stripe:listen
```

If it worked, it will print the webhook key. Then, paste it into 
your environment files as `STRIPE_WEBHOOK_SECRET`. 

This key is also needed to run Stripe during development to receive the 
Stripe webhooks to your local server.

```
ENABLE_STRIPE_TESTING=true
```

The Stripe tests work only using the Embedded Stripe Checkout.

### Full Documentation
To continue setting up your application, please take a look at [the official 
documentation](https://makerkit.dev/docs/setting-up-firebase).
