
const healthStatus = document.getElementById("health-status");
const healthDescription = document.getElementById("health-description");
const totalItems = document.getElementById("total-items");
const itemsTable = document.getElementById("items-table");
const itemForm = document.getElementById("item-form");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("submit-btn");
const refreshButton = document.getElementById("refresh-btn");

async function checkHealth() {
    try {
        const response = await fetch("/health");

        if (!response.ok) {
            throw new Error("Health check failed");
        }

        const data = await response.json();

        if (data.status === "healthy") {
            healthStatus.textContent = "Healthy";
            healthStatus.className = "healthy";
            healthDescription.textContent = "API is responding normally";
        } else {
            throw new Error("Unexpected health status");
        }
    } catch (error) {
        healthStatus.textContent = "Offline";
        healthStatus.className = "unhealthy";
        healthDescription.textContent = "Unable to reach FastAPI";
    }
}

async function loadItems() {
    try {
        const response = await fetch("/items");

        if (!response.ok) {
            throw new Error("Unable to load items");
        }

        const data = await response.json();
        const items = data.items || [];

        totalItems.textContent = items.length;
        itemsTable.replaceChildren();

        if (items.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 3;
            cell.textContent = "No items yet. Add your first item.";

            row.appendChild(cell);
            itemsTable.appendChild(row);
            return;
        }

        items.forEach((item) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;

            const priceCell = document.createElement("td");
            priceCell.textContent = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR"
            }).format(item.price);

            const statusCell = document.createElement("td");
            const badge = document.createElement("span");

            badge.className = "status-badge";
            badge.textContent = "Active";

            statusCell.appendChild(badge);
            row.append(nameCell, priceCell, statusCell);
            itemsTable.appendChild(row);
        });
    } catch (error) {
        itemsTable.replaceChildren();

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 3;
        cell.textContent = "Failed to load items. Please refresh.";

        row.appendChild(cell);
        itemsTable.appendChild(row);
        totalItems.textContent = "—";
    }
}

itemForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = itemName.value.trim();
    const price = Number(itemPrice.value);

    if (!name || !Number.isFinite(price) || price < 0) {
        formMessage.textContent = "Enter a valid name and price.";
        formMessage.className = "error";
        return;
    }

    submitButton.disabled = true;
    formMessage.textContent = "Adding item...";
    formMessage.className = "";

    try {
        const response = await fetch("/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price })
        });

        if (!response.ok) {
            throw new Error("Failed to create item");
        }

        formMessage.textContent = "Item added successfully!";
        formMessage.className = "success";

        itemForm.reset();
        await loadItems();
    } catch (error) {
        formMessage.textContent = "Unable to add item. Try again.";
        formMessage.className = "error";
    } finally {
        submitButton.disabled = false;
    }
});

refreshButton.addEventListener("click", async () => {
    await Promise.all([checkHealth(), loadItems()]);
});

checkHealth();
loadItems();
