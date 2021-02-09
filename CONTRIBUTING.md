# Contributing

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/)

## Dependencies

Install the Node.js dependencies.

```console
$ make install
```

## Test

Run the unit tests from the [`test`](./test) folder.

```console
$ make test
```

## Build

Transpile the library in the `library` folder. The folder will be emptied before transpilation.

```console
$ make build
```

## Types

Output the types in the `library` folder.

```console
$ make types
```

## Lint

Check the code style.

```console
$ make lint
```
