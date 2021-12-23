Server
======
Running the server on a Linux machine:
    1. navigate to the directory with both Dockerfile and Makefile inside
    2. enter "make build" into the terminal
    3. enter "make run" into the terminal

    Note: in order to stop the server, enter ^C

Running the server on a Windows machine:
    1. download Docker Desktop for windows (https://docs.docker.com/desktop/windows/install/)
    2. enable WSL (Windows Subsystem for Linux) (https://docs.microsoft.com/en-us/windows/wsl/install)
    3. recommended: download Windows Terminal Preview from Microsoft Store
    4. use Windows Terminal Preview with WSL and follow the steps for running the server on a Linux machine

The server runs in a Docker container, which is why the windows configuration is somewhat complex.
The contents of the API are available to see or modify on port 8000.

Potential bugs and fixes:
1.) When building the containers on a local machine through WSL and Docker Desktop, a bug occurred that resulted in the building of container timing out. The solution to this bug is to use the following command: "DOCKER_BUILD=0" (docker build)
The following is the link to the github issue concerning the problem: https://github.com/docker/buildx/issues/415