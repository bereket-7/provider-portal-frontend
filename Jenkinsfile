pipeline {
    agent any

    environment {
        // Docker configuration
        DOCKER_REGISTRY = credentials('docker-registry-url') // Configure in Jenkins credentials
        DOCKER_IMAGE_NAME = 'nextjs-app'
        DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_BUILDKIT = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
        
        // Application configuration
        NEXT_PUBLIC_API_URL = credentials('next-public-api-url') // Configure in Jenkins credentials
        NEXT_PUBLIC_APP_URL = credentials('next-public-app-url') // Configure in Jenkins credentials
        
        // Node.js configuration
        NODE_VERSION = '20'
        
        // Cache configuration
        YARN_CACHE_FOLDER = "${WORKSPACE}/.yarn-cache"
        NEXT_CACHE_FOLDER = "${WORKSPACE}/.next/cache"
    }

    options {
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        
        // Disable concurrent builds
        disableConcurrentBuilds()
        
        // Timestamps in console output
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "🔄 Checking out code from repository..."
                    checkout scm
                    
                    // Get git commit info
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    
                    env.GIT_BRANCH = sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()
                    
                    echo "✅ Checked out branch: ${env.GIT_BRANCH} (${env.GIT_COMMIT_SHORT})"
                }
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    echo "📦 Setting up Node.js ${NODE_VERSION}..."
                    
                    // Use NodeJS plugin or Docker
                    sh """
                        node --version
                        npm --version
                        yarn --version || npm install -g yarn
                    """
                    
                    echo "✅ Node.js setup complete"
                }
            }
        }

        stage('Cache Dependencies') {
            steps {
                script {
                    echo "💾 Restoring dependency cache..."
                    
                    // Cache yarn dependencies
                    cache(maxCacheSize: 1000, caches: [
                        arbitraryFileCache(
                            path: '.yarn-cache',
                            cacheValidityDecidingFile: 'yarn.lock'
                        )
                    ]) {
                        echo "✅ Yarn cache restored"
                    }
                    
                    // Cache Next.js build cache
                    cache(maxCacheSize: 500, caches: [
                        arbitraryFileCache(
                            path: '.next/cache',
                            cacheValidityDecidingFile: 'package.json'
                        )
                    ]) {
                        echo "✅ Next.js cache restored"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "📥 Installing dependencies..."
                    
                    sh """
                        export YARN_CACHE_FOLDER=${YARN_CACHE_FOLDER}
                        yarn install --frozen-lockfile --prefer-offline
                    """
                    
                    echo "✅ Dependencies installed"
                }
            }
        }

        stage('Lint & Type Check') {
            parallel {
                stage('ESLint') {
                    steps {
                        script {
                            echo "🔍 Running ESLint..."
                            sh 'yarn lint'
                            echo "✅ ESLint passed"
                        }
                    }
                }
                
                stage('TypeScript') {
                    steps {
                        script {
                            echo "🔍 Running TypeScript type check..."
                            sh 'yarn check-types'
                            echo "✅ Type check passed"
                        }
                    }
                }
                
                stage('Prettier') {
                    steps {
                        script {
                            echo "🔍 Running Prettier format check..."
                            sh 'yarn check-format'
                            echo "✅ Format check passed"
                        }
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    echo "🏗️ Building Next.js application..."
                    
                    sh """
                        export NEXT_TELEMETRY_DISABLED=1
                        yarn build
                    """
                    
                    echo "✅ Application built successfully"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🐳 Building Docker image with BuildKit..."
                    
                    // Build with cache from registry
                    sh """
                        docker buildx build \\
                            --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \\
                            --build-arg NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \\
                            --cache-from type=registry,ref=${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:buildcache \\
                            --cache-to type=registry,ref=${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:buildcache,mode=max \\
                            --tag ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \\
                            --tag ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${GIT_COMMIT_SHORT} \\
                            --tag ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:latest \\
                            --load \\
                            .
                    """
                    
                    echo "✅ Docker image built successfully"
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    echo "🧪 Testing Docker image..."
                    
                    // Start container for testing
                    sh """
                        docker run -d \\
                            --name nextjs-test-${BUILD_NUMBER} \\
                            -p 3000:3000 \\
                            ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                        
                        # Wait for container to be healthy
                        timeout 60 sh -c 'until docker inspect --format="{{.State.Health.Status}}" nextjs-test-${BUILD_NUMBER} | grep -q healthy; do sleep 2; done'
                        
                        # Test health endpoint
                        curl -f http://localhost:3000/api/health || exit 1
                        
                        # Stop and remove test container
                        docker stop nextjs-test-${BUILD_NUMBER}
                        docker rm nextjs-test-${BUILD_NUMBER}
                    """
                    
                    echo "✅ Docker image tests passed"
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    echo "🔒 Running security scan..."
                    
                    // Use Trivy for vulnerability scanning
                    sh """
                        # Install Trivy if not available
                        which trivy || (
                            wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
                            echo "deb https://aquasecurity.github.io/trivy-repo/deb \$(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
                            sudo apt-get update
                            sudo apt-get install trivy
                        )
                        
                        # Scan image for vulnerabilities
                        trivy image --severity HIGH,CRITICAL ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                    """
                    
                    echo "✅ Security scan complete"
                }
            }
        }

        stage('Push to Registry') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                script {
                    echo "📤 Pushing Docker image to registry..."
                    
                    // Login to Docker registry
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-registry-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin ${DOCKER_REGISTRY}
                            
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${GIT_COMMIT_SHORT}
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:latest
                        """
                    }
                    
                    echo "✅ Docker images pushed successfully"
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "🚀 Deploying application..."
                    
                    // Deploy using docker-compose
                    sh """
                        export DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG}
                        docker-compose -f docker-compose.yml pull
                        docker-compose -f docker-compose.yml up -d
                        
                        # Wait for services to be healthy
                        timeout 120 sh -c 'until docker-compose ps | grep -q "healthy"; do sleep 5; done'
                    """
                    
                    echo "✅ Deployment complete"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "🧹 Cleaning up..."
                
                // Clean up test containers
                sh """
                    docker ps -a | grep nextjs-test-${BUILD_NUMBER} | awk '{print \$1}' | xargs -r docker rm -f || true
                """
                
                // Archive build artifacts
                archiveArtifacts artifacts: '.next/**/*', allowEmptyArchive: true
                
                // Clean workspace if needed
                // cleanWs()
            }
        }
        
        success {
            script {
                echo "✅ Pipeline completed successfully!"
                
                // Send success notification (configure as needed)
                // slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} succeeded"
            }
        }
        
        failure {
            script {
                echo "❌ Pipeline failed!"
                
                // Send failure notification (configure as needed)
                // slackSend color: 'danger', message: "Build ${env.BUILD_NUMBER} failed"
            }
        }
        
        unstable {
            script {
                echo "⚠️ Pipeline is unstable!"
            }
        }
    }
}
