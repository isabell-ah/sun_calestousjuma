# ^add && sign-off git commit

ARCH             = $(shell uname -s | tr '[:upper:]' '[:lower:]')
ARCH_T 	= linux darwin 
ifeq ($(filter $(ARCH),$(ARCH_T)),)
    $(error Unsupported OS: $(ARCH))
else
SHELL 	= /bin/zsh
server:
	npm install 
	npm run dev &
git:
	node CJLF
	git add . && git commit -a -s
kill:
	pkill -9 node
clean:
	rm -rf node_modules
endif

