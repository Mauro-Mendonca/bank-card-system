export function pesquisar() {
  const termo = document.getElementById("name-server-id").value.trim().toLowerCase();
  const container = document.getElementById("lista-container");

  if (!termo) {
    alert("Digite um termo para pesquisar.");
    return;
  }

  // Remove destaques anteriores
  container.querySelectorAll("mark").forEach(mark => {
    const texto = document.createTextNode(mark.textContent);
    mark.parentNode.replaceChild(texto, mark);
  });

  // Função para destacar texto em nós de texto
  function destacar(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.toLowerCase().includes(termo)) {
      const span = document.createElement("span");
      const regex = new RegExp(`(${termo})`, "gi");
      span.innerHTML = node.textContent.replace(regex, "<mark>$1</mark>");
      node.parentNode.replaceChild(span, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(destacar);
    }
  }

  destacar(container);
}