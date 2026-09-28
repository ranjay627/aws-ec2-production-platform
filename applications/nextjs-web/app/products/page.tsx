import ResourceManager from "@/components/resource-manager";
import { resourceConfigs } from "@/lib/resources";

export default function ProductsPage() {
  return <ResourceManager config={resourceConfigs.products} />;
}