# Fixing 403 Forbidden Error (CORS Issue)

## Problem
You're getting a 403 Forbidden error when making API requests from the frontend. This is typically a CORS (Cross-Origin Resource Sharing) issue.

## Solution 1: Fix CORS on Backend (Recommended)

Your backend needs to allow requests from the frontend origin. Here's how to configure it:

### For Express.js/Node.js Backend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### For Spring Boot (Java):

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### For Flask (Python):

```python
from flask_cors import CORS

CORS(app, origins=["http://localhost:5173", "http://localhost:3000"], 
     supports_credentials=True)
```

## Solution 2: Use Vite Proxy (Alternative)

If you can't modify the backend CORS settings, you can use the Vite proxy I've already configured.

1. Update your `.env` file to use the proxy:
   ```
   VITE_API_BASE_URL=/api
   ```

2. The proxy will automatically forward requests from `/api/*` to `https://bgv-auth-service.onrender.com/*`

## Testing

After fixing CORS, test your endpoints:
- Register: `POST https://bgv-auth-service.onrender.com/auth/register`
- Login: `POST https://bgv-auth-service.onrender.com/auth/login`
- Google Auth: `POST https://bgv-auth-service.onrender.com/auth/google`
- Refresh: `POST https://bgv-auth-service.onrender.com/auth/refresh`

## Common Issues

1. **Backend not running**: Make sure your backend server is running on port 8080
2. **Wrong origin**: Ensure the frontend origin matches what's configured in backend CORS
3. **Preflight requests**: Make sure OPTIONS requests are handled correctly




