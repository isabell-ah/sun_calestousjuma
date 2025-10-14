# ^add && sign-off git commit

ARCH            = $(shell uname -s | tr '[:upper:]' '[:lower:]')
ARCH_T 			= linux darwin 


ifeq ($(filter $(ARCH),$(ARCH_T)),)
    $(error Unsupported OS: $(ARCH))
else
server:
	cd web && npm install && npm run dev &
git:
	cd web && npm run format
	node tools/cjlf.js
	git add . && git commit -a -s
kill:
	pkill -9 node
clean:
	cd web && rm -rf node_modules
install:
	cd web && npm install
dev:
	cd web && npm run dev
build:
	cd web && npm run build
endif

