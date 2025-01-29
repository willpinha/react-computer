# Contributing to *react.computer*

Firstly, thank you for wanting to be part of this project! I believe that contributing to *react.computer* is important both to help
create the components and for you to learn more about React

There are 3 ways you can contribute:

-   Making a pull request creating or updating one or more components
-   Creating an issue pointing out a bug in *react.computer*
-   Giving the repository a star! This is important to me because it shows that my work is being valued

For a component to be considered accepted in *react.computer*, it must:

-   Be unique, both in style and functionality
-   Not contain real people information (phone number, email, ...)
-   Not contain communications with external servers. All components must be local
-   Have a single purpose. Components that represent, for example, a complete page will not be accepted
-   Have clean and organized code, separated into files
-   Be responsive on mobile

## Guides

### Running the project locally

*react.computer* uses PNPM. It is the only package manager accepted for this project

```
pnpm i
pnpm run dev
```

### Creating a component

The components are located in `src/wiki`. Every directory within `src/wiki` represents a category that must be in camel case (e.g. myCategoryName).
Within each category, each directory represents a component that must be in pascal case (ex. MyComponentName)

Inside the component directory, there should be an `Index.tsx` file that exports an `Index` function in the following format:

```tsx
export function Index() {
  return "Hello World";
}
```

By following the steps above, *react.computer* will automatically load the component. You can also create additional files alongside
`Index.tsx` with the extensions `ts`, `tsx` and `module.css`

> [!IMPORTANT]
> New categories will not be accepted directly. To suggest a new category, create an issue explaining the category's use cases. If approved,
> you can use it in *react.computer*

> [!IMPORTANT]
> Installation of new dependencies on *react.computer* will only be accepted if approved. Create an issue explaining the use cases
> for the new dependency
