import ResourceManager from "@/components/resource-manager";
import { resourceConfigs } from "@/lib/resources";

export default function CategoriesPage() {
  return <ResourceManager config={resourceConfigs.categories} />;
}