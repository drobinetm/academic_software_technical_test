import React, { useMemo, useState } from 'react';
import { CustomerContext } from './CustomerContext';
import { createEmptyCustomerForm } from '../../services/customer/customerTransformers';

export function CustomerProvider({ children }) {
  const [listFilters, setListFilters] = useState({
    nombre: '',
    identificacion: '',
  });
  const [customerDraft, setCustomerDraft] = useState(createEmptyCustomerForm());

  const resetCustomerDraft = () => setCustomerDraft(createEmptyCustomerForm());

  const value = useMemo(
    () => ({
      listFilters,
      setListFilters,
      customerDraft,
      setCustomerDraft,
      resetCustomerDraft,
    }),
    [customerDraft, listFilters]
  );

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}
