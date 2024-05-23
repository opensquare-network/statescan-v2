import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";
import useChainSettings from "../utils/hooks/chain/useChainSettings";

export const useIdentityQuery = createModuleQuery("identity");

export const useIdentityLazyQuery = createModuleLazyQuery("identity");

export const useMultisigQuery = createModuleQuery("multisig");

export const useMultisigLazyQuery = createModuleLazyQuery("multisig");

export const useVestingsQuery = createModuleQuery("vestings");

export const useRecoveryQuery = createModuleQuery("recovery");

/**
 * @param {string} module
 * @description useLazyQuery
 */
function createModuleLazyQuery(module) {
  /**
   * @type {typeof useLazyQuery}
   */
  return function useModuleLazyQuery(...args) {
    const { modules = {} } = useChainSettings();
    const [fn, lazyQueryResult] = useLazyQuery(...args);
    const mod = modules?.[module];

    /**
     * @type {typeof fn} options
     */
    const fetcher = useCallback(
      async (options) => {
        if (mod) {
          return fn(options);
        }
      },
      [fn, mod],
    );

    return [fetcher, lazyQueryResult];
  };
}

/**
 * @param {string} module
 * @description useQuery
 */
function createModuleQuery(module) {
  const useModuleLazyQuery = createModuleLazyQuery(module);

  /**
   * @type {typeof useQuery}
   */
  return function useModuleQuery(...args) {
    const [fetcher, result] = useModuleLazyQuery(...args);
    const { modules } = useChainSettings();

    useEffect(() => {
      fetcher();
    }, [fetcher, modules?.[module]]);

    return result;
  };
}
