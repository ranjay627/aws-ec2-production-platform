"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ResourceConfig, ResourceField, ResourceRecord } from "@/lib/resources";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

type ResourceManagerProps = {
  config: ResourceConfig;
};

function emptyForm(fields: ResourceField[]) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

async function readError(response: Response) {
  const detail = await response.text();
  return detail || `Request failed with status ${response.status}`;
}

export default function ResourceManager({ config }: ResourceManagerProps) {
  const [records, setRecords] = useState<ResourceRecord[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>(() => emptyForm(config.fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/${config.endpoint}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(await readError(response));
        return response.json() as Promise<ResourceRecord[]>;
      })
      .then((data) => {
        setRecords(data);
        setProblem(null);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") setProblem(error.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [config.endpoint]);

  async function refreshRecords() {
    const response = await fetch(`${apiBaseUrl}/${config.endpoint}`);
    if (!response.ok) throw new Error(await readError(response));
    setRecords((await response.json()) as ResourceRecord[]);
  }

  async function startEditing(record: ResourceRecord) {
    setProblem(null);
    setNotice(null);

    try {
      const response = await fetch(`${apiBaseUrl}/${config.endpoint}/${record.id}`);
      if (!response.ok) throw new Error(await readError(response));
      const selected = (await response.json()) as ResourceRecord;
      setEditingId(selected.id);
      setFormValues(Object.fromEntries(config.fields.map((field) => [field.name, String(selected[field.name] ?? "")])));
    } catch (error) {
      setProblem(error instanceof Error ? error.message : `Could not load this ${config.singular}.`);
    }
  }

  function resetForm() {
    setEditingId(null);
    setFormValues(emptyForm(config.fields));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setProblem(null);
    setNotice(null);

    const payload = Object.fromEntries(
      config.fields.map((field) => [
        field.name,
        field.type === "number" ? Number(formValues[field.name]) : formValues[field.name].trim(),
      ]),
    );

    try {
      const response = await fetch(`${apiBaseUrl}/${config.endpoint}${editingId ? `/${editingId}` : ""}`, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(await readError(response));
      await refreshRecords();
      setNotice(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} ${editingId ? "updated" : "created"}.`);
      resetForm();
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Could not save this record.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(record: ResourceRecord) {
    if (!window.confirm(`Delete this ${config.singular}? This cannot be undone.`)) return;
    setDeletingId(record.id);
    setProblem(null);
    setNotice(null);

    try {
      const response = await fetch(`${apiBaseUrl}/${config.endpoint}/${record.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(await readError(response));
      setRecords((current) => current.filter((item) => item.id !== record.id));
      if (editingId === record.id) resetForm();
      setNotice(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} deleted.`);
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Could not delete this record.");
    } finally {
      setDeletingId(null);
    }
  }

  const visibleRecords = records.filter((record) =>
    config.fields.some((field) => String(record[field.name] ?? "").toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <section className="resource-page">
      <div className="eyebrow"><span className="status-dot" /> COLLECTION / {config.endpoint.toUpperCase()}</div>
      <div className="resource-heading">
        <div>
          <p className="section-kicker">OPERATIONS / {config.endpoint.toUpperCase()}</p>
          <h1>{config.plural}</h1>
          <p className="page-description">{config.description}</p>
        </div>
        <div className="count-stamp"><strong>{String(records.length).padStart(2, "0")}</strong><span>RECORDS</span></div>
      </div>

      {problem && <div className="alert alert-error" role="alert"><strong>Request failed</strong><span>{problem}</span></div>}
      {notice && <div className="alert alert-success" role="status">{notice}</div>}

      <div className="workspace-grid">
        <section className="records-panel" aria-labelledby="records-title">
          <div className="panel-header">
            <div><p className="section-kicker">LIVE DATA</p><h2 id="records-title">All {config.plural.toLowerCase()}</h2></div>
            <span className="record-total">{records.length} TOTAL</span>
          </div>
          <div className="table-tools">
            <label className="search-field"><span className="search-mark" aria-hidden="true" /><span className="visually-hidden">Search {config.plural.toLowerCase()}</span><input onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${config.plural.toLowerCase()}`} value={query} /></label>
            <span className="api-method">GET /{config.endpoint}</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr>{config.fields.map((field) => <th key={field.name}>{field.label}</th>)}<th className="actions-heading">ACTIONS</th></tr></thead>
              <tbody>
                {visibleRecords.map((record) => (
                  <tr key={record.id}>
                    {config.fields.map((field) => <td key={field.name}>{String(record[field.name] ?? "-") || "-"}</td>)}
                    <td className="row-actions">
                      <button className="text-action" onClick={() => startEditing(record)} type="button">Edit</button>
                      <button className="text-action danger-action" disabled={deletingId === record.id} onClick={() => void handleDelete(record)} type="button">{deletingId === record.id ? "Deleting" : "Delete"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className="table-state">Loading {config.plural.toLowerCase()}...</div>}
            {!loading && !problem && visibleRecords.length === 0 && <div className="table-state">{query ? "No matching records." : `No ${config.plural.toLowerCase()} yet. Add the first one.`}</div>}
          </div>
          <div className="table-footer"><span>Showing {visibleRecords.length} of {records.length} records</span><span>In-memory storage</span></div>
        </section>

        <section className="form-panel" aria-labelledby="form-title">
          <div className="panel-header form-panel-header">
            <div><p className="section-kicker">{editingId ? "EDIT RECORD" : "NEW RECORD"}</p><h2 id="form-title">{editingId ? `Edit ${config.singular}` : `Add ${config.singular}`}</h2></div>
            <span className="form-mark">{editingId ? "ED" : "NEW"}</span>
          </div>
          <form onSubmit={handleSubmit}>
            {config.fields.map((field) => (
              <label className="form-field" key={field.name}>
                <span>{field.label}{field.required && <span className="required-mark"> *</span>}</span>
                {field.type === "textarea" ? (
                  <textarea onChange={(event) => setFormValues({ ...formValues, [field.name]: event.target.value })} required={field.required} rows={3} value={formValues[field.name] ?? ""} />
                ) : field.type === "select" ? (
                  <select onChange={(event) => setFormValues({ ...formValues, [field.name]: event.target.value })} required={field.required} value={formValues[field.name] ?? ""}>
                    <option disabled value="">Choose a status</option>
                    {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : (
                  <input onChange={(event) => setFormValues({ ...formValues, [field.name]: event.target.value })} required={field.required} step={field.step} type={field.type} value={formValues[field.name] ?? ""} />
                )}
              </label>
            ))}
            <div className="form-actions">
              <button className="primary-button" disabled={saving} type="submit">{saving ? "Saving..." : editingId ? "Save changes" : `Create ${config.singular}`}</button>
              {editingId && <button className="secondary-button" onClick={resetForm} type="button">Cancel</button>}
            </div>
          </form>
          <div className="endpoint-note"><span className="method-pill">{editingId ? "PUT" : "POST"}</span><code>/{config.endpoint}{editingId ? "/:id" : ""}</code></div>
        </section>
      </div>
    </section>
  );
}