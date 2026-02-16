# Docker Build Troubleshooting Guide

## Issues Fixed

### 1. Missing EvaluationResult Type

**Error:**

```
Type error: Module '"./types"' has no exported member 'EvaluationResult'.
```

**Fix:**
Added the `EvaluationResult` type export to `src/permissions/abac/types.ts`:

```typescript
export type EvaluationResult = {
	allowed: boolean;
	decision: "allow" | "deny" | "none";
	matchedPolicies: Array<{
		id: string;
		effect: "allow" | "deny";
		description?: string;
	}>;
	allowedBy?: string;
	deniedBy?: string;
};
```

### 2. Missing AttributeContext Properties

**Error:**

```
Type error: Property 'patient' does not exist on type 'AttributeContext'.
```

**Fix:**
Extended `AttributeContext` type with optional healthcare-specific properties:

```typescript
export type AttributeContext = {
	action: string;
	user: { ... };
	resource: {
		type: string;
		id?: string;  // Added
		attributes: Record<string, any>;
		[key: string]: any;
	};
	environment: { ... };
	// Added optional healthcare contexts
	patient?: { ... };
	encounter?: { ... };
	organization?: { ... };
	consent?: { ... };
};
```

## Common Docker Build Issues

### Cache Import Error (Non-Critical)

```
ERROR: failed to configure registry cache importer: pull access denied
```

**Explanation:** This error occurs because the Dockerfile tries to import cache from `your-registry/nextjs-app:buildcache`, which doesn't exist yet. This is **not a critical error** - the build will continue without the cache.

**Solutions:**

1. **Ignore it** - The build will work fine without remote cache
2. **Remove cache configuration** - Edit `docker-compose.yml`:
   ```yaml
   build:
     context: .
     dockerfile: Dockerfile
     # Remove or comment out these lines:
     # cache_from:
     #   - type=registry,ref=your-registry/nextjs-app:buildcache
     # cache_to:
     #   - type=registry,ref=your-registry/nextjs-app:buildcache,mode=max
   ```
3. **Configure your registry** - Replace `your-registry` with your actual Docker registry URL

### Slow Build Times

**Issue:** First build takes 5-10 minutes

**Solutions:**

- Use `docker-compose build` (without `--no-cache`) for subsequent builds
- BuildKit will cache layers automatically
- Dependencies only rebuild when `package.json` or `yarn.lock` changes

### TypeScript Errors During Build

**Issue:** Build fails with TypeScript compilation errors

**Solutions:**

1. **Test locally first:**
   ```bash
   yarn check-types
   yarn build
   ```
2. **Fix errors** before building Docker image
3. **Check imports** - Ensure all types are properly exported

## Build Commands

### Standard Build

```bash
# Build with cache
docker-compose build

# Build without cache (clean build)
docker-compose build --no-cache

# Build and start
docker-compose up -d --build
```

### Using Make

```bash
# Build
make build

# Build and deploy
make deploy

# Clean and rebuild
make clean
make build
```

### Direct Docker Build

```bash
# Build image
docker build -t nextjs-app:latest .

# Build with build args
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  -t nextjs-app:latest .
```

## Debugging Build Failures

### View Build Logs

```bash
# View detailed build output
docker-compose build --progress=plain

# View specific stage
docker build --target=builder -t test .
```

### Test Build Stages

```bash
# Test deps stage
docker build --target=deps -t test-deps .

# Test builder stage
docker build --target=builder -t test-builder .

# Test runner stage
docker build --target=runner -t test-runner .
```

### Check Layer Sizes

```bash
# View image layers
docker history nextjs-app:latest

# View image size
docker images nextjs-app
```

## Performance Optimization

### Enable BuildKit

```bash
# Windows (PowerShell)
$env:DOCKER_BUILDKIT=1
$env:COMPOSE_DOCKER_CLI_BUILD=1

# Linux/Mac
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
```

### Use Build Cache

```bash
# Build with inline cache
docker build --cache-from nextjs-app:latest -t nextjs-app:latest .
```

### Parallel Builds

BuildKit automatically parallelizes independent stages.

## Verification Steps

After successful build:

### 1. Check Image Size

```bash
docker images nextjs-app:latest
# Should be ~180-250MB
```

### 2. Test Container

```bash
# Start container
docker run -d -p 3000:3000 --name test-app nextjs-app:latest

# Check health
curl http://localhost:3000/api/health

# View logs
docker logs test-app

# Clean up
docker stop test-app
docker rm test-app
```

### 3. Verify Standalone Output

```bash
# Check if standalone was created
docker run --rm nextjs-app:latest ls -la .next/standalone
```

## Next Steps

Once build succeeds:

1. **Start the application:**

   ```bash
   docker-compose up -d
   ```

2. **Verify it's running:**

   ```bash
   docker-compose ps
   curl http://localhost:3000/api/health
   ```

3. **View logs:**

   ```bash
   docker-compose logs -f nextjs-app
   ```

4. **Access the application:**
   Open http://localhost:3000 in your browser

## Additional Resources

- [Dockerfile](./Dockerfile) - Multi-stage build configuration
- [docker-compose.yml](./docker-compose.yml) - Container orchestration
- [Makefile](./Makefile) - Convenient commands
- [README.md](./README.md) - Project documentation
