import ResourceManager from "@/components/resource-manager";
import { resourceConfigs } from "@/lib/resources";

export default function CustomersPage() {
  return <ResourceManager config={resourceConfigs.customers} />;
}