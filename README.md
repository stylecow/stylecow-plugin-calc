stylecow plugin calc
====================

Stylecow plugin to resolve some `calc()` functions.

You write:

```css
p {
	font-size: calc(2rem * 2);
}
```

And stylecow converts to:

```css
p {
	font-size: 4rem;
}
```

More demos in [the tests folder](https://github.com/stylecow/stylecow-plugin-calc/tree/master/tests/cases)