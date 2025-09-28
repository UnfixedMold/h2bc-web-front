"use client";
import { useState } from 'react';
import Button from '@/app/components/ui/buttons/Button';
import TextButton from '@/app/components/ui/buttons/TextButton';
import ImageButton from '@/app/components/ui/buttons/ImageButton';
import Dropdown from '@/app/components/ui/inputs/Dropdown';
import StepperInput from '@/app/components/ui/inputs/StepperInput';
import { TextInput, TextArea } from '@/app/components/ui/inputs/TextFields';
import Heading from '@/app/components/ui/Heading';
import { FiHome, FiShoppingCart, FiUser, FiHeart, FiSearch } from 'react-icons/fi';

export default function TestComponentsPage() {
  const [dropdownValue, setDropdownValue] = useState('option1');
  const [stepperValue, setStepperValue] = useState(1);

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  return (
    <div className="space-y-12">
      <Heading level={1} className="mb-8">UI Components Test Page</Heading>

      {/* Headings Section */}
      <section>
        <Heading level={2} className="mb-6 border-b-2 border-black pb-2">Headings</Heading>

        <div className="space-y-6">
          <div>
            <Heading level={3} className="mb-4">Heading Levels</Heading>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted mb-1">Level: h1</div>
                <Heading level={1}>The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Level: h2</div>
                <Heading level={2}>The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Level: h3</div>
                <Heading level={3}>The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Level: h4</div>
                <Heading level={4}>The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Level: h5</div>
                <Heading level={5}>The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Level: h6</div>
                <Heading level={6}>The quick brown fox jumps</Heading>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3} className="mb-4">Font Families</Heading>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted mb-1">Font: blackletter</div>
                <Heading level={2} font="blackletter">The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Font: sans-serif (default)</div>
                <Heading level={2}>The quick brown fox jumps</Heading>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Font: script</div>
                <Heading level={2} font="script">The quick brown fox jumps</Heading>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section>
        <Heading level={2} className="mb-6 border-b-2 border-black pb-2">Buttons</Heading>

        {/* Regular Buttons */}
        <div className="space-y-6">
          <div>
            <Heading level={3} className="mb-4">Button Component - Sizes & Variants</Heading>
            <div className="space-y-4">
              {/* Primary Variant */}
              <div>
                <Heading level={4} className="mb-2">Primary Variant</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">Small Primary</Button>
                  <Button variant="primary">Medium Primary</Button>
                  <Button variant="primary">Large Primary</Button>
                  <Button variant="primary" disabled>Disabled Primary</Button>
                </div>
              </div>

              {/* Secondary Variant */}
              <div>
                <Heading level={4} className="mb-2">Secondary Variant</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="secondary">Small Secondary</Button>
                  <Button variant="secondary">Medium Secondary</Button>
                  <Button variant="secondary">Large Secondary</Button>
                  <Button variant="secondary" disabled>Disabled Secondary</Button>
                </div>
              </div>

              {/* Full Width */}
              <div>
                <Heading level={4} className="mb-2">Full Width</Heading>
                <div className="space-y-2 max-w-md">
                  <Button variant="primary" fullWidth>Small Primary Full Width</Button>
                  <Button variant="secondary" fullWidth>Medium Secondary Full Width</Button>
                  <Button variant="primary" fullWidth uppercase>Large Primary Uppercase</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Text Buttons */}
          <div>
            <Heading level={3} className="mb-4">Text Button Component</Heading>
            <div className="space-y-4">
              <div>
                <Heading level={4} className="mb-2">Sizes</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <TextButton>Small Text Button</TextButton>
                  <TextButton>Medium Text Button</TextButton>
                  <TextButton>Large Text Button</TextButton>
                </div>
              </div>

              <div>
                <Heading level={4} className="mb-2">States</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <TextButton>Normal Text Button</TextButton>
                  <TextButton active>Active Text Button</TextButton>
                  <TextButton disabled>Disabled Text Button</TextButton>
                </div>
              </div>
            </div>
          </div>

          {/* Image Buttons */}
          <div>
            <Heading level={3} className="mb-4">Image Button Component</Heading>
            <div className="space-y-4">
              <div>
                <Heading level={4} className="mb-2">Sizes</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <ImageButton href="/"><FiHome size={16} /></ImageButton>
                  <ImageButton href="/"><FiHome size={20} /></ImageButton>
                  <ImageButton href="/"><FiHome size={24} /></ImageButton>
                </div>
              </div>

              <div>
                <Heading level={4} className="mb-2">States</Heading>
                <div className="flex flex-wrap gap-4 items-center">
                  <ImageButton href="/"><FiHome size={20} /></ImageButton>
                  <ImageButton href="/shop" active><FiShoppingCart size={20} /></ImageButton>
                  <ImageButton href="/profile"><FiUser size={20} /></ImageButton>
                  <ImageButton href="/favorites"><FiHeart size={20} /></ImageButton>
                  <ImageButton href="https://example.com" external ariaLabel="Search"><FiSearch size={20} /></ImageButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs Section */}
      <section>
        <Heading level={2} className="mb-6 border-b-2 border-black pb-2">Input Components</Heading>

        <div className="space-y-6">
          {/* Text Fields */}
          <div>
            <Heading level={3} className="mb-4">Text Fields</Heading>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm mb-2">Text Input</label>
                <TextInput type="text" placeholder="Enter some text..." />
              </div>

              <div>
                <label className="block text-sm mb-2">Email Input</label>
                <TextInput type="email" placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm mb-2">Password Input</label>
                <TextInput type="password" placeholder="Password" />
              </div>

              <div>
                <label className="block text-sm mb-2">Disabled Input</label>
                <TextInput type="text" placeholder="Disabled field" disabled />
              </div>

              <div>
                <label className="block text-sm mb-2">Text Area</label>
                <TextArea placeholder="Enter a longer message..." rows={4} />
              </div>
            </div>
          </div>

          {/* Dropdown */}
          <div>
            <Heading level={3} className="mb-4">Dropdown Component</Heading>
            <div className="space-y-4">
              <div>
                <Heading level={4} className="mb-2">Primary Variant</Heading>
                <div className="flex flex-wrap gap-4 items-start">
                  <div>
                    <label className="block text-sm mb-2">Left Aligned</label>
                    <Dropdown
                      options={dropdownOptions}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant="primary"
                      align="left"
                      inputClassName="px-3 py-2 min-w-32"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Right Aligned</label>
                    <Dropdown
                      options={dropdownOptions}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant="primary"
                      align="right"
                      inputClassName="px-3 py-2 min-w-32"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Disabled</label>
                    <Dropdown
                      options={dropdownOptions}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant="primary"
                      disabled
                      inputClassName="px-3 py-2 min-w-32"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Heading level={4} className="mb-2">Secondary Variant</Heading>
                <div className="flex flex-wrap gap-4 items-start">
                  <div>
                    <label className="block text-sm mb-2">Left Aligned</label>
                    <Dropdown
                      options={dropdownOptions}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant="secondary"
                      align="left"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Right Aligned</label>
                    <Dropdown
                      options={dropdownOptions}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant="secondary"
                      align="right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Disabled</label>
                    <Dropdown
                      options={dropdownOptions}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant="secondary"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Input */}
          <div>
            <Heading level={3} className="mb-4">Stepper Input Component</Heading>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Quantity Selector (Current: {stepperValue})</label>
                <StepperInput
                  value={stepperValue}
                  onChange={setStepperValue}
                  min={1}
                  max={10}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">No Max Limit</label>
                <StepperInput
                  value={stepperValue}
                  onChange={setStepperValue}
                  min={0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <Heading level={2} className="mb-6 border-b-2 border-black pb-2">Interactive Examples</Heading>

        <div className="space-y-6">
          {/* Form Example */}
          <div className="max-w-md p-6 border border-black bg-gray-50">
            <Heading level={3} className="mb-4">Sample Form</Heading>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm mb-2">Name</label>
                <TextInput type="text" placeholder="Your name" />
              </div>

              <div>
                <label className="block text-sm mb-2">Category</label>
                <Dropdown
                  options={[
                    { value: 'general', label: 'General Inquiry' },
                    { value: 'support', label: 'Support' },
                    { value: 'sales', label: 'Sales' },
                  ]}
                  value="general"
                  onChange={() => {}}
                  variant="primary"
                  inputClassName="w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Quantity</label>
                <StepperInput
                  value={1}
                  onChange={() => {}}
                  min={1}
                  max={5}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Message</label>
                <TextArea placeholder="Your message..." rows={3} />
              </div>

              <div className="flex gap-2">
                <Button variant="primary" fullWidth>Submit</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}