pipeline {
	agent any
	
	environment {
		DOCKER_COMPOSE_VERSION = '2.24.5'
		SSH_KEY = credentials('SSH_KEY')
		SSH_USER = credentials('SSH_USER')
		EC2_HOST = credentials('EC2_HOST')
	}

	stages {
		stage("Checkout") {
			steps {
				git "https://github.com/OZ-Coding-School/oz_01_collabo-005"
			}
		}

		stage("Test Django") {
			steps {
				sh "cd backend && python manage.py test"
			}
		}

		stage("Test React") {
			steps {
				sh "cd front && npm install && npm test"
			}
		}

		stage("Build and Deploy") {
			steps {
				script {
					sh """
						ssh -i ${SSH_KEY} ${SSH_USER}@${EC2_HOST} '
							cd oz_01_collabo-005 &&
							docker-compose up -d
						'
					"""
				}
			}
		}
	}

    post {
        success {
            echo 'CI/CD pipeline succeeded! Deploying...'
        }
        failure {
            echo 'CI/CD pipeline failed! Notify developers...'
        }
    }
}

