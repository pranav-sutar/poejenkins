pipeline {
    agent any
    
    environment {
        EC2_INSTANCE_IP = 'ec2-13-60-47-147.eu-north-1.compute.amazonaws.com' // Replace with your EC2 instance IP
        EC2_USER = 'ubuntu' // Replace with the appropriate username (e.g., 'ubuntu' for Ubuntu AMIs)
        SSH_KEY = credentials('EC2_SSH_KEY') // Use the credential ID of your SSH private key stored in Jenkins
    }
    
    stages {
    
        
        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2_SSH_KEY', keyFileVariable: 'SSH_KEY_FILE')]) {
                        // SSH into EC2 instance and deploy the application
                        sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY_FILE $EC2_USER@$EC2_INSTANCE_IP << EOF
                            # Exit if any command fails
                            set -e
                            
                            # Ensure poejenkins directory exists
                            if [ ! -d "poejenkins" ]; then
                                mkdir -p poejenkins
                            fi
                            cd poejenkins

                            # Pull latest changes
                            git pull origin main

                            # Install dependencies
                            npm install

                            # Restart the application
                            pm2 restart poejenkins
                        """
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment to EC2 succeeded!'
        }
        failure {
            echo 'Deployment to EC2 failed.'
        }
    }
}