package com.production_spring_boot_app;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

final class InMemoryCrudStore<T> {
	private final ConcurrentMap<String, T> items = new ConcurrentHashMap<>();

	List<T> findAll() {
		return new ArrayList<>(items.values());
	}

	Optional<T> findById(String id) {
		return Optional.ofNullable(items.get(id));
	}

	T create(String id, T item) {
		items.put(id, item);
		return item;
	}

	Optional<T> replace(String id, T item) {
		return items.replace(id, item) != null ? Optional.of(item) : Optional.empty();
	}

	boolean delete(String id) {
		return items.remove(id) != null;
	}
}