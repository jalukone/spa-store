import { NotFound } from "./pages/404";

class Router {
  constructor(routes) { // Recibimos array de objetos con las rutas
    this.routes = routes;
  }

  init() {
    this.listenForChanges();
    this.navigateInitialPage();
  }

  listenForChanges() {

    window.addEventListener('popstate', () => {
      this.route(window.location.pathname);
    });

    window.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'A') {
        window.history.pushState(null, '', e.target.href);
        this.route(e.target.pathname);
      }
    });
  }

  navigateInitialPage() {
    this.route(window.location.pathname);
  }

  route(path) {
    const container = document.getElementById('container');
    const query = location.search;
    const params = new URLSearchParams(query);
    const id = params.get('id');

    const matchedRoute = this.routes.find(route => route.path === path);

    if (matchedRoute) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      if (id) {
        container.insertAdjacentHTML('beforeend', matchedRoute.component(id)); // No funciono con appendChild
        return;
      }
      container.appendChild(matchedRoute.component());

    } else {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(NotFound());
    }
  }
}

export default Router;
