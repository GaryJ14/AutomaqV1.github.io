// Paso 1: Cargar el inventario almacenado en el almacenamiento local (si existe)
let inventory = [];

const storedInventory = localStorage.getItem('inventory');
if (storedInventory) {
  inventory = JSON.parse(storedInventory);
}

// Paso 2: Agregar evento de escucha al formulario
document.getElementById('addItemForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

  // Obtener los valores ingresados por el usuario
  const itemName = document.getElementById('itemName').value;
  const itemQuantity = document.getElementById('itemQuantity').value;

  // Paso 3: Agregar los datos ingresados al inventario
  if (itemName.trim() !== '' && itemQuantity.trim() !== '') {
    const newItem = {
      name: itemName,
      quantity: parseInt(itemQuantity)
    };

    inventory.push(newItem);

    // Limpiar el formulario
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';

    // Paso 4: Actualizar el almacenamiento local y la lista de inventario
    updateLocalStorage();
    updateInventoryList();
  }
});

// Función para actualizar el almacenamiento local con el inventario actual
function updateLocalStorage() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Función para mostrar los elementos en la lista de inventario
function updateInventoryList() {
  const inventoryList = document.getElementById('inventoryList');
  inventoryList.innerHTML = ''; // Limpiar la lista antes de actualizarla

  for (let i = 0; i < inventory.length; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${inventory[i].name} - Cantidad: ${inventory[i].quantity} 
      <button class="edit-btn" onclick="editItem(${i})">Editar</button>
      <button class="delete-btn" onclick="deleteItem(${i})">Eliminar</button>`;
    inventoryList.appendChild(listItem);
  }
}

// Función para editar un elemento del inventario
function editItem(index) {
  const newName = prompt('Ingrese el nuevo nombre del artículo:', inventory[index].name);
  const newQuantity = parseInt(prompt('Ingrese la nueva cantidad:', inventory[index].quantity));

  if (newName.trim() !== '' && !isNaN(newQuantity)) {
    inventory[index].name = newName;
    inventory[index].quantity = newQuantity;

    updateLocalStorage();
    updateInventoryList();
  } else {
    alert('Por favor, ingrese valores válidos para editar el artículo.');
  }
}

// Función para eliminar un elemento del inventario
function deleteItem(index) {
  const confirmDelete = confirm('¿Está seguro de eliminar este artículo del inventario?');

  if (confirmDelete) {
    inventory.splice(index, 1);
    updateLocalStorage();
    updateInventoryList();
  }
}

// Mostrar el inventario inicial al cargar la página
updateInventoryList();