<template>
    <main class="my-8">
        <search @doSearch="setSearchTerm" />
        <div v-if="errorMessage === ''" class="container mx-auto px-6">
            <h3 class="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
            <span
                data-testid="total-quantity-label"
                class="mt-3 text-sm text-gray-500"
                >{{ quantityLabel }}</span
            >
            <div
                class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
            >
                <product-card v-for="(item, index) in 12" :key="index" />
            </div>
        </div>
        <h3 v-else class=":text-center text-2x1">{{ errorMessage }}</h3>
    </main>
</template>

<script>
import { ProductCard, Search } from "../components"

export default {
    components: { ProductCard, Search },
}
</script>
