# Evaluation Methodology

The repository includes 24 labeled bilingual seller questions spanning six agents. The evaluation runner measures:

- **Routing accuracy**: selected agent and stage match the label.
- **Grounding rate**: answer contains retrieved knowledge evidence.
- **Claim safety rate**: answer does not contain prohibited product claims.
- **CTA completeness**: answer provides a next action.
- **Average quality**: aggregate structural checks.

These are test-set metrics, not business conversion metrics.
