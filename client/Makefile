DOCKER_IMAGE:=client

default:
	python3 -m http.server 8001

build:
	docker build --tag ${DOCKER_IMAGE} .

test:
	docker run --rm ${DOCKER_IMAGE}
