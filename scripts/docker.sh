set -ex

REPO=bykof/pokecoin-server
GIT_TAG=$(git describe --exact-match --tags $(git log -n1 --pretty='%h'))

docker buildx build -t $REPO:latest -t $REPO:$GIT_TAG --push --platform=linux/arm64,linux/amd64 -f Dockerfile .
