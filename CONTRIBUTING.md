# Contributing to React Computer

Firstly, thank you for wanting to be part of this project!

There are two ways you can contribute:

-   Making a pull request creating or updating one or more components
-   Creating an issue [reporting a bug](https://github.com/willpinha/react-computer/issues/new?template=component-bug-report.yml) in an existing component and, optionally, creating a pull request resolving this bug

For a component to be considered accepted in React Computer, it must:

-   Be unique, both in style and functionality
-   Not contain real people information (phone number, email, ...)
-   Not contain communications with external servers. All components must be local
-   Have a single purpose. Components that represent, for example, a complete page will not be accepted

## Guides

### Running the project locally

React Computer uses PNPM. It is the only package manager accepted for this project

```
pnpm i
pnpm run dev
```

### Creating a component

The components are located in `src/wiki`. Each component is located in a directory named as a timestamp in the format `YYYYMMDDHHMMSS`, which represents in UTC the component creation time

Inside this directory, the `metadata.ts` file contains component metadata such as its name and which category it belongs to. The `Index.tsx` file is the component's entry point and is what will be rendered

You can also create additional files alongside `Index.tsx` with the extensions `tsx` and `module.css`

To create a new component, run the command below:

```
pnpm run new-component
```
