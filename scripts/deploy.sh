echo "Deploying on digitalocean"

COMMAND="cd ${REMOTE_PATH} && git checkout digitalocean && git pull"

ssh -o StrictHostKeyChecking=no -i sshTravis -v ${REMOTE_USER}@${REMOTE_HOST} ${COMMAND}