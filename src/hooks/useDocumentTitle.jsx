import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * A custom hook that updates the document title.
 */
function useDocumentTitle(title) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title + ' | Topebox Project Manager';
  }, [title]);
}

export default useDocumentTitle;
