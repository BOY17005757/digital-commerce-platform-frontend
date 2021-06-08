# Digital Commerce Platform Front End UI (digital-commerce-platform-frontend)

Handles the User Interface for the Digital Commerce Platform Front End, and sends API requests to the Digital Commerce Platform Back End

### **Dependencies:**
+ nodejs
+ reactjs
+ @headlessui/react
+ @heroicons/react
+ @tailwindcss/forms
+ @testing-library/jest-dom
+ @testing-library/react
+ @testing-library/user-event
+ axios
+ moment
+ node-fetch
+ query-string
+ react
+ react-awesome-spinners
+ react-datetime-picker
+ react-dom
+ react-helmet
+ react-jwt
+ react-router-bootstrap
+ react-router-dom
+ react-scripts
+ serve
+ styled-components
+ web-vitals
+ workbox-core
+ workbox-expiration
+ workbox-precaching
+ workbox-routing
+ workbox-strategies
+ autoprefixer,
+ postcss
+ postcss-cli
+ tailwindcss

### **Configuration and Setup:**
### Local Development
+ Install Node
+ Open a powershell window within the root directory
+ Run the following command: **npm start**
+ Navigate to (http://localhost:3000/dashboard/site) and update the "name" and "short_name" fields to amend the global site name

### Local Production Serve
+ Install Node
+ Open a powershell window within the root directory
+ Run the following command: **npm run build**
+ Run the following command: **serve -s build**
+ Navigate to (http://localhost:5000/dashboard/site) and update the "name" and "short_name" fields to amend the global site name

### Hosted (Heroku)
+ Create Heroku dyno using the Node buildpack
+ Connect to GitHub repository, and enable automated deployments
+ Build the dyno, which will run the Procfile **web: npm run server** command
+ Navigate to (<'hostname'>/dashboard/site) and update the "name" and "short_name" fields to amend the global site name