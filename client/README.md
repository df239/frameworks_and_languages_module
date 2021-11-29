Client
======
When building the containers on a local machine through WSL and Docker Desktop, a bug occurred that resulted in the building of container timing out. The solution to this bug is to use the following command: "DOCKER_BUILD=0" (docker build)
The following is the link to the github issue concerning the problem: https://github.com/docker/buildx/issues/415