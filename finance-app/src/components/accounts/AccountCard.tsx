import type { FC } from 'hono/jsx';
import { Account } from '@prisma/client'; // Import Account type from Prisma

interface AccountCardProps {
  account: Account;
}

export const AccountCard: FC<AccountCardProps> = ({ account }) => {
  const typedAccount = account as Account; // Explicitly cast to Account
  return (
    <div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="subheader">{typedAccount.type}</div>
            <div class="ms-auto lh-1">
              <div class="dropdown">
                <a class="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                <div class="dropdown-menu dropdown-menu-end">
                  <a class="dropdown-item" href="#">
                    Edit
                  </a>
                  <a class="dropdown-item" href="#">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="h1 mb-3">{typedAccount.name}</div>
          <div class="d-flex mb-2">
            <div>Balance</div>
            <div class="ms-auto">
              <span class="text-green">{typedAccount.currency} {typedAccount.balance.toFixed(2)}</span>
            </div>
          </div>
          <div class="d-flex">
            <div>Created</div>
            <div class="ms-auto text-muted">{new Date(typedAccount.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
