set -ex

REPO=bykof/pokecoin-server
GIT_TAG=$(git describe --exact-match --tags $(git log -n1 --pretty='%h'))

docker build . -t $REPO:latest -t $REPO:$GIT_TAG

for t in latest $GIT_TAG; do
    docker push "${REPO}:${t}"
done
