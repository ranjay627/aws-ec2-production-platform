package com.production_spring_boot_app;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {
	private final InMemoryCrudStore<Product> products = new InMemoryCrudStore<>();
	private final InMemoryCrudStore<Category> categories = new InMemoryCrudStore<>();
	private final InMemoryCrudStore<Customer> customers = new InMemoryCrudStore<>();
	private final InMemoryCrudStore<Order> orders = new InMemoryCrudStore<>();

	@GetMapping("/products")
	public List<Product> getProducts() {
		return products.findAll();
	}

	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable String id) {
		return products.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/products")
	public Product createProduct(@RequestBody ProductInput input) {
		String id = UUID.randomUUID().toString();
		return products.create(id, new Product(id, input.name(), input.description(), input.price(), input.quantity()));
	}

	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody ProductInput input) {
		Product product = new Product(id, input.name(), input.description(), input.price(), input.quantity());
		return products.replace(id, product).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
		return products.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	@GetMapping("/categories")
	public List<Category> getCategories() {
		return categories.findAll();
	}

	@GetMapping("/categories/{id}")
	public ResponseEntity<Category> getCategory(@PathVariable String id) {
		return categories.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/categories")
	public Category createCategory(@RequestBody CategoryInput input) {
		String id = UUID.randomUUID().toString();
		return categories.create(id, new Category(id, input.name(), input.description()));
	}

	@PutMapping("/categories/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody CategoryInput input) {
		Category category = new Category(id, input.name(), input.description());
		return categories.replace(id, category).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/categories/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
		return categories.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	@GetMapping("/customers")
	public List<Customer> getCustomers() {
		return customers.findAll();
	}

	@GetMapping("/customers/{id}")
	public ResponseEntity<Customer> getCustomer(@PathVariable String id) {
		return customers.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/customers")
	public Customer createCustomer(@RequestBody CustomerInput input) {
		String id = UUID.randomUUID().toString();
		return customers.create(id, new Customer(id, input.firstName(), input.lastName(), input.email(), input.phone()));
	}

	@PutMapping("/customers/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable String id, @RequestBody CustomerInput input) {
		Customer customer = new Customer(id, input.firstName(), input.lastName(), input.email(), input.phone());
		return customers.replace(id, customer).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/customers/{id}")
	public ResponseEntity<Void> deleteCustomer(@PathVariable String id) {
		return customers.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	@GetMapping("/orders")
	public List<Order> getOrders() {
		return orders.findAll();
	}

	@GetMapping("/orders/{id}")
	public ResponseEntity<Order> getOrder(@PathVariable String id) {
		return orders.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/orders")
	public Order createOrder(@RequestBody OrderInput input) {
		String id = UUID.randomUUID().toString();
		return orders.create(id, new Order(id, input.customerName(), input.productName(), input.quantity(), input.total(), input.status()));
	}

	@PutMapping("/orders/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody OrderInput input) {
		Order order = new Order(id, input.customerName(), input.productName(), input.quantity(), input.total(), input.status());
		return orders.replace(id, order).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/orders/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
		return orders.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	public record Product(String id, String name, String description, double price, int quantity) {}
	public record ProductInput(String name, String description, double price, int quantity) {}
	public record Category(String id, String name, String description) {}
	public record CategoryInput(String name, String description) {}
	public record Customer(String id, String firstName, String lastName, String email, String phone) {}
	public record CustomerInput(String firstName, String lastName, String email, String phone) {}
	public record Order(String id, String customerName, String productName, int quantity, double total, String status) {}
	public record OrderInput(String customerName, String productName, int quantity, double total, String status) {}
}