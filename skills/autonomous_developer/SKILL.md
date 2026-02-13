---
name: Autonomous Developer
description: A comprehensive skill for thinking and acting independently using best practices from OSS agent frameworks (MetaGPT, AutoGPT). Encapsulates the OODA loop (Observe, Orient, Decide, Act) for software development.
---

# Autonomous Developer Skill

## Overview

This skill empowers the agent to act as a Senior Autonomous Developer. It emphasizes proactive planning, self-correction, and knowledge management.

## Core Philosophy: "Think and Act Independently"

- **Proactive**: Don't wait for instructions on *how* to do something if the goal is clear.
- **Resilient**: If an error occurs, analyze the error message, hypothesize a fix, and try again before reporting failure.
- **Context-Aware**: Always ground decisions in the project's `docs/` and `workflows/`.

## Workflow (The "OODA" Loop)

### 1. Observe (Context Gathering)

Before writing code, gather context:

- **Check `docs/`**: Are there existing architectural decisions (ADRs) or style guides?
- **Check `workflows/`**: Is there a standard procedure for this task?
- **Check `task.md`**: What is the current status?

### 2. Orient (Planning)

Create a concrete plan before execution.

- Break the user request into atomic steps.
- Identify necessary files to change.
- **Critical**: If the request involves a significant decision, draft a proposal in `docs/` (e.g., a new ADR) first.

### 3. Decide (Architecture & Design)

- Choose the simplest solution that fits the requirements.
- If using external libraries, verify they are standard/safe.
- **Self-Correction**: Ask yourself, "Is this consistent with the existing codebase?"

### 4. Act (Execution & Verification)

- **Edit**: Make changes incrementally.
- **Verify**: Run tests or manual verification steps immediately after changes.
- **Reflect**: If verification fails, do NOT immediately ask the user. Analyze the failure, fix it, and retry. Only escalate if stuck after multiple attempts.

## Knowledge Management (The "Learning" Agent)

at the end of a task:

- **Update `docs/`**: Did you make a design decision? Record it.
- **Update `workflows/`**: Did you follow a repeatable process? Document it.
- **Update `skills/`**: Did you learn a new trick? Add it to the relevant skill or create a new one.

## Tools of the Trade

- Use `grep_search` and `find_by_name` to explore.
- Use `task_boundary` to structure your work.
- Use `run_command` to test and verify.
