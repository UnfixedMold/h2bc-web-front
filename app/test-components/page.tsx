import { Button } from "@/components/ui/button"

export default function TestComponentsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-8">Test Components</h1>

      <div className="space-y-4">
        <h2 className="text-xl">shadcn/ui Button</h2>
        <div className="flex gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive" >Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  );
}