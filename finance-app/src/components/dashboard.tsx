import type { FC } from "hono/jsx";

interface DashboardProps {
  title: string;
  description: string;
}

const Dashboard: FC<DashboardProps> = ({ title, description }) => {
  return (
    <div class="page-body">
      <div class="container">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">{title}</h2>
            <p>{description}</p>
            <div class="mb-3">
              <label class="form-label">Text</label>
              <input
                type="text"
                class="form-control"
                name="example-text-input"
                placeholder="Input placeholder"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                name="example-password-input"
                placeholder="Input placeholder"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Disabled</label>
              <input
                type="text"
                class="form-control"
                name="example-password-input"
                placeholder="Input placeholder"
                disabled
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Readonly</label>
              <input
                type="text"
                class="form-control"
                name="example-password-input"
                value="Readolny value"
                readonly
              />
            </div>
            <div class="mb-3">
              <div class="form-label">Toggle switches</div>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" checked />
                <span class="form-check-label">Option 1</span>
              </label>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" />
                <span class="form-check-label">Option 2</span>
              </label>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" />
                <span class="form-check-label">Option 3</span>
              </label>
            </div>
            <div class="mb-3">
              <div class="form-label">Single switch</div>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" />
                <span class="form-check-label">
                  I agree with terms and conditions
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
