# Cravings Fast Food

A functional two-sided fast-food ordering demo:

- Customer storefront with menu categories, cart, checkout, delivery address, order IDs and tracking.
- Admin-only dashboard with password gate, incoming orders, status workflow, revenue/order stats and menu management.
- Customer users cannot navigate to the admin dashboard unless they know the admin password.
- Orders and menu data persist with browser localStorage.

## Run
Open `index.html` directly in a browser, or serve the folder with any static server.

## Demo admin
Password: `cravings123`

## Important for real deployment
The included version is a fully interactive prototype and persists data in the browser. For true cross-device / anywhere ordering, connect the order functions to a hosted backend such as Supabase/Firebase and use real server-side authentication with an admin role. Never rely on a frontend-only password for production security.
