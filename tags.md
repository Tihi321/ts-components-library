## Adding version

When you would like to add version, you can first make a build with

```bash
yarn build
```

push everything to git, to make it in sync.

To check what tags are allready created

```bash
git tag
```

Then create a new version for that commit with command, example for version 2.2.3

```bash
git tag -a 2.2.3 -m "Fix dropdown item and expose container"
```

Whith this you have created version locally, and you just have to push it to repositry with

```bash
git push --tags
```

Now your new version of module is available to install with npm
